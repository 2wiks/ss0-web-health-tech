import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const qualifications = [
  "Board-certified medical professional",
  "15+ years of clinical experience",
  "Advanced training in multiple specialties",
  "Published researcher and medical educator",
  "Committed to evidence-based medicine",
];

export const About = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-secondary bg-secondary/10 px-4 py-2 rounded-full">
                About Our Practice
              </span>
            </div>
            
            <h2 className="text-4xl font-bold">
              Dedicated to Your Health & Wellbeing
            </h2>
            
            <p className="text-muted-foreground text-lg">
              With over 15 years of experience in medical practice, our commitment is to provide 
              exceptional healthcare that combines clinical excellence with genuine compassion. 
              We believe in treating the whole person, not just symptoms.
            </p>
            
            <div className="space-y-3">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{qual}</span>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="lg" className="mt-6">
              View Credentials
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver personalized, patient-centered care that empowers individuals to achieve 
                and maintain optimal health through prevention, early detection, and comprehensive treatment.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p className="text-muted-foreground">
                We combine the latest medical advances with time-tested practices, taking the time to 
                listen, understand, and develop customized treatment plans that align with your health goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
