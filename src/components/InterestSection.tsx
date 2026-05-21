import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Phone, Mail } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://apihealth.echavarrias.com";

const InterestSection = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactType, setContactType] = useState<"phone" | "email">("phone");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = ((formData.get("full_name") as string) ?? "").trim();
    const contact = ((formData.get("contact") as string) ?? "").trim();

    if (!fullName || !contact) {
      toast({
        title: "Revisa la información",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    if (contactType === "email" && !contact.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      full_name: fullName,
      contact,
      contact_type: contactType,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/prueba-piloto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al registrar interés");
      }

      setSubmitted(true);
      form.reset();

      toast({
        title: "¡Recibimos tu información!",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "No pudimos registrar tu interés",
        description: "Intenta nuevamente en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="interes" className="py-20 md:py-24 px-4">
      <div className="container mx-auto max-w-xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            ¿Te interesa Sense?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Déjanos tus datos y nos pondremos en contacto contigo para darte toda la información sobre la segunda ronda.
          </p>
        </div>

        {submitted ? (
          <div className="bg-card rounded-2xl p-8 space-y-4 text-center shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground text-lg">¡Gracias por tu interés!</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recibimos tu información. Muy pronto nos comunicaremos contigo con todos los detalles.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 md:p-8 space-y-5 shadow-sm border border-border"
          >
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-1.5">
                Nombre completo
              </label>
              <input
                name="full_name"
                id="full_name"
                required
                placeholder="Tu nombre"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="contact" className="block text-sm font-medium text-foreground">
                  {contactType === "phone" ? "Teléfono celular" : "Correo electrónico"}
                </label>
                <div className="flex items-center gap-1 p-0.5 bg-muted rounded-lg">
                  <button
                    type="button"
                    onClick={() => setContactType("phone")}
                    className={`p-1.5 rounded-md transition-colors ${
                      contactType === "phone"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Teléfono"
                    aria-label="Usar teléfono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType("email")}
                    className={`p-1.5 rounded-md transition-colors ${
                      contactType === "email"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Email"
                    aria-label="Usar email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <input
                name="contact"
                id="contact"
                type={contactType === "email" ? "email" : "tel"}
                required
                placeholder={contactType === "phone" ? "Ej. +57 300 000 0000" : "tu@email.com"}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity text-base"
            >
              {loading ? "Enviando..." : "Quiero más información"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Te contactaremos para darte toda la información. Sin compromiso.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default InterestSection;
