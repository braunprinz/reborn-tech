// Resend email integration for lead notifications
import { Resend } from 'resend';
import type { ContactSubmission } from '@shared/schema';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

async function getResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}

export async function sendLeadNotificationEmail(submission: ContactSubmission): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const needsLabels: Record<string, string> = {
      'local-growth': 'Local Growth (Maps/SEO)',
      'website': 'Website Creation',
      'ai-automation': 'AI Automation',
      'custom-it': 'Custom IT Solutions'
    };

    const formattedNeeds = submission.primaryNeeds
      .map(need => needsLabels[need] || need)
      .join(', ');

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); color: #e6edf3; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #d0d7de; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #57606a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1a1a1a; }
    .highlight { background: #f6f8fa; padding: 16px; border-radius: 6px; border-left: 4px solid #0969da; }
    .footer { text-align: center; padding: 20px; color: #57606a; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Lead Inquiry</h1>
      <p style="margin: 8px 0 0; opacity: 0.8;">Digital Systems - ${submission.locale === 'de' ? 'German' : 'English'} Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Business Name</div>
        <div class="value">${submission.businessName}</div>
      </div>
      
      <div class="field">
        <div class="label">Location</div>
        <div class="value">${submission.city}, ${submission.country}</div>
      </div>
      
      ${submission.website ? `
      <div class="field">
        <div class="label">Website</div>
        <div class="value"><a href="${submission.website}">${submission.website}</a></div>
      </div>
      ` : ''}
      
      ${submission.gbpLink ? `
      <div class="field">
        <div class="label">Google Business Profile</div>
        <div class="value"><a href="${submission.gbpLink}">${submission.gbpLink}</a></div>
      </div>
      ` : ''}
      
      <div class="highlight">
        <div class="field" style="margin-bottom: 12px;">
          <div class="label">Primary Needs</div>
          <div class="value">${formattedNeeds}</div>
        </div>
        <div class="field" style="margin-bottom: 12px;">
          <div class="label">Budget Range</div>
          <div class="value">${submission.budgetRange}</div>
        </div>
        <div class="field" style="margin-bottom: 0;">
          <div class="label">Timeline</div>
          <div class="value">${submission.timeline}</div>
        </div>
      </div>
      
      <div class="field" style="margin-top: 20px;">
        <div class="label">Message</div>
        <div class="value" style="white-space: pre-wrap;">${submission.message}</div>
      </div>
    </div>
    <div class="footer">
      Submitted on ${new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>
  </div>
</body>
</html>
    `;

    const result = await client.emails.send({
      from: fromEmail,
      to: fromEmail, // Send to the configured email address
      subject: `New Lead: ${submission.businessName} - ${formattedNeeds}`,
      html: emailHtml,
    });

    console.log('Lead notification email sent:', result);
    return true;
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    return false;
  }
}
