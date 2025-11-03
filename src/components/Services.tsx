import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Stethoscope, Activity, Users, Pill, ShieldPlus } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Cardiology",
    description: "Comprehensive heart care with advanced diagnostic tools and treatment plans.",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Primary care services for diagnosis, treatment, and prevention of various conditions.",
  },
  {
    icon: Activity,
    title: "Preventive Care",
    description: "Regular check-ups, screenings, and wellness programs to maintain optimal health.",
  },
  {
    icon: Users,
    title: "Family Medicine",
    description: "Complete healthcare solutions for patients of all ages, from newborns to seniors.",
  },
  {
    icon: Pill,
    title: "Chronic Care",
    description: "Specialized management of long-term conditions like diabetes and hypertension.",
  },
  {
    icon: ShieldPlus,
    title: "Emergency Care",
    description: "24/7 urgent care services for immediate medical attention and support.",
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">Our Medical Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive healthcare services delivered with expertise, compassion, and cutting-edge technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 bg-[image:var(--gradient-card)]"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
