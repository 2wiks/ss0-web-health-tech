import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { registerInterest, type InterestPayload } from "@/api/interests";
import { useToast } from "@/hooks/use-toast";

type InterestFormValues = InterestPayload;

const Interests = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InterestFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: InterestFormValues) => {
    try {
      setIsSubmitting(true);

      await registerInterest({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
      });

      toast({
        title: "Registro completado",
        description: "Gracias por tu interés en Hacking Health.",
      });

      form.reset({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Ocurrió un error al registrar tu interés. Inténtalo de nuevo.";

      toast({
        title: "No se pudo registrar tu interés",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { control, handleSubmit } = form;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-normal text-foreground mb-3 tracking-tight">Registra tu interés</h1>
            <p className="text-base text-muted-foreground">
              Déjanos tus datos para mantenerte al tanto de Hacking Health.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <FormField
                control={control}
                name="name"
                rules={{
                  required: "El nombre completo es obligatorio.",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre completo"
                        autoComplete="name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                rules={{
                  required: "El email es obligatorio.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un email válido.",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Tu número de celular"
                        autoComplete="tel"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registrando..." : "Registrar"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Interests;

