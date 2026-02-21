import { useState, useRef } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Instagram, Linkedin, Phone,  Smile, Loader2 } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/why_not_studios_/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/why-not-studios-byakshay/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/918169978881?text=Hi", icon: Phone, label: "WhatsApp" },
];

const FORM_ID = "xpqjyqll";
const FORMSPREE_ENDPOINT =
  import.meta.env.DEV ? "/api/formspree" : `https://formspree.io/f/${FORM_ID}`;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = res.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await res.json().catch(() => ({})) : {};

      if (!res.ok) {
        const errors = (data as { errors?: Array<{ message?: string }> })?.errors;
        const msg = errors?.[0]?.message || (data as { error?: string })?.error || "Failed to send";
        throw new Error(msg);
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      form.reset(
        { name: "", email: "", message: "" },
        { keepErrors: false, keepDirty: false, keepIsSubmitted: false, keepTouched: false }
      );
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        toast({
          title: "Request timed out",
          description: "Please check your connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: err instanceof Error ? err.message : "Could not send. Try emailing akshay@whynotstudios.in",
          variant: "destructive",
        });
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="lg:pt-1">
            <div className="mb-12 text-center">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-[0.9] lowercase">
                shoot us a <span className="text-primary/80 italic">signal.</span>
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-background shrink-0">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-primary mb-1 italic tracking-tighter">Visit the Lab</h4>
                  <p className="text-primary/60 font-medium">Bangalore | Mumbai <br />Pan India</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center text-background shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-primary mb-1 italic tracking-tighter">Digitally Speaking</h4>
                  <p className="text-primary/60 font-medium underline decoration-secondary decoration-2 underline-offset-4">akshay@whynotstudios.in </p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-primary/10">
              <p className="text-primary/40 text-xs uppercase font-black tracking-widest mb-6 italic">Follow the madness</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 flex items-center justify-center border-2 border-primary text-primary hover:bg-secondary hover:border-secondary hover:text-background transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 shadow-2xl shadow-primary/10 border-r-8 border-b-8 border-secondary w-full">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "name"> }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-black text-background/70">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="h-12 md:h-14 w-full rounded-none border border-background/20 bg-background/5 px-4 text-background font-medium placeholder:text-background/40 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-0 focus-visible:border-secondary"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "email"> }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-black text-background/70">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="e.g. hello@example.com"
                          {...field}
                          className="h-12 md:h-14 w-full rounded-none border border-background/20 bg-background/5 px-4 text-background font-medium placeholder:text-background/40 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-0 focus-visible:border-secondary"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "message"> }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="uppercase tracking-widest text-xs font-black text-background/70">
                        Tell us more
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What's the dream?"
                          {...field}
                          className="min-h-[140px] w-full rounded-none border border-background/20 bg-background/5 px-4 py-3 text-background font-medium placeholder:text-background/40 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-0 focus-visible:border-secondary resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 md:h-16 rounded-none bg-primary text-background font-black tracking-widest uppercase hover:bg-secondary transition-colors text-base md:text-lg disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      "Get In Touch"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
