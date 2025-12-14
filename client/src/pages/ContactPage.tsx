import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTrackEvent } from "@/hooks/use-analytics";
import { type Locale, contactFormSchema, type ContactFormData } from "@shared/schema";
import { loadContent } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface ContactPageProps {
  locale: Locale;
}

export default function ContactPage({ locale }: ContactPageProps) {
  const [content, setContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const trackEvent = useTrackEvent();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      businessName: "",
      website: "",
      gbpLink: "",
      country: "",
      city: "",
      primaryNeeds: [],
      budgetRange: "",
      timeline: "",
      message: "",
      locale: locale,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      trackEvent("form_submission", { form: "contact", locale });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: locale === "de" ? "Fehler" : "Error",
        description: locale === "de" 
          ? "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut."
          : "There was a problem sending your inquiry. Please try again.",
      });
    },
  });

  useEffect(() => {
    Promise.all([
      loadContent(locale, "contact"),
      loadContent(locale, "home"),
    ]).then(([contact, home]) => {
      setContent(contact);
      setHomeContent(home);
    });
  }, [locale]);

  if (!content || !homeContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate({ ...data, locale });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} nav={homeContent.nav} />
      
      <main className="pt-24">
        <section className="section-padding">
          <div className="max-w-6xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-gradient mb-4" data-testid="text-contact-title">
                {content.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
                {content.hero.subtitle}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                {submitted ? (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{content.success.title}</h2>
                    <p className="text-muted-foreground">{content.success.description}</p>
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-8">
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-2">{content.intro.title}</h2>
                      <p className="text-sm text-muted-foreground">{content.intro.description}</p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.businessName.label}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={content.form.businessName.placeholder} 
                                    {...field} 
                                    data-testid="input-business-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.website.label}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={content.form.website.placeholder} 
                                    {...field} 
                                    data-testid="input-website"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="gbpLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.form.gbpLink.label}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={content.form.gbpLink.placeholder} 
                                  {...field} 
                                  data-testid="input-gbp-link"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.country.label}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={content.form.country.placeholder} 
                                    {...field} 
                                    data-testid="input-country"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.city.label}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={content.form.city.placeholder} 
                                    {...field} 
                                    data-testid="input-city"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="primaryNeeds"
                          render={() => (
                            <FormItem>
                              <FormLabel>{content.form.primaryNeeds.label}</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {content.form.primaryNeeds.options.map((option: any) => (
                                  <FormField
                                    key={option.value}
                                    control={form.control}
                                    name="primaryNeeds"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center gap-2 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option.value)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.value])
                                                : field.onChange(field.value?.filter((v) => v !== option.value));
                                            }}
                                            data-testid={`checkbox-need-${option.value}`}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="budgetRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.budgetRange.label}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-budget">
                                      <SelectValue placeholder={content.form.budgetRange.placeholder} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {content.form.budgetRange.options.map((option: any) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="timeline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.form.timeline.label}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-timeline">
                                      <SelectValue placeholder={content.form.timeline.placeholder} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {content.form.timeline.options.map((option: any) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.form.message.label}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={content.form.message.placeholder}
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full"
                          disabled={mutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              {content.form.submitting}
                            </>
                          ) : (
                            content.form.submit
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="glass-card rounded-2xl p-8 sticky top-24">
                  <h3 className="font-semibold mb-6">{content.aside.title}</h3>
                  <ol className="space-y-4">
                    {content.aside.steps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 pt-6 border-t border-border/50 text-xs text-muted-foreground/60 italic">
                    {content.aside.note}
                  </p>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} content={homeContent.footer} />
    </div>
  );
}
