import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Clock, 
  FileText, 
  Brain, 
  TrendingUp, 
  Users, 
  Stethoscope, 
  BookOpen,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1. Hero Section */}
      <section className="pt-40 pb-24 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extralight text-primary tracking-tight leading-tight">
            Continuous Health Intelligence<br />for Precision Longevity
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We integrate physiological signals, behavioral patterns, and clinical knowledge to deliver individualized insights that support long-term health, resilience, and optimal aging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-light hover:bg-primary/90 transition-colors"
            >
              Request Early Access
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/community')}
              className="px-8 py-3 border border-border rounded-md font-light hover:bg-muted/50 transition-colors"
            >
              For Medical Partners
            </Button>
          </div>
        </div>
      </section>

      {/* 2. What We Do */}
      <section className="py-24 px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center mb-8">
            From Continuous Monitoring to Clinical-Grade Interpretation
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            Modern health requires more than occasional check-ups. Our platform continuously evaluates the body's core physiological systems — cardiovascular, autonomic, circadian and behavioral — transforming raw signals into actionable, clinically aligned insights.
          </p>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            We help individuals and clinicians identify early deviations, optimize recovery, and guide long-term longevity strategies with unprecedented precision.
          </p>
          <div className="pt-8 text-center text-sm font-light text-muted-foreground">
            Physiological Data → Clinical Interpretation → Personalized Actions → Long-term Outcomes
          </div>
        </div>
      </section>

      {/* 3. How It Works — Four Pillars */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center mb-16">
            How It Works — Four Pillars of the System
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="group relative p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  1️⃣ Continuous Physiological Acquisition
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  We gather high-frequency information from validated biosensors: heart rhythm dynamics, blood pressure trends, sleep architecture, activity cycles, and autonomic load.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  These signals reveal how the body responds, adapts, and recovers in real environments.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative p-8 rounded-3xl border border-border/50 hover:border-teal/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-teal to-sage flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-teal mb-4">
                  2️⃣ Circadian and Biological Rhythm Analysis
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Using advanced chronobiological models, we quantify the synchrony of your internal clocks — sleep-wake cycles, metabolic rhythms, activity patterns, and autonomic balance.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  This allows us to estimate your <strong>biological age of circadian function</strong>, a sensitive marker of healthspan and resilience.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  3️⃣ Clinical Knowledge Interpretation
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  We convert unstructured symptoms, notes, and self-reports into structured medical concepts, enabling a clinical-grade understanding of your health status.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  The system maps relevant patterns: cardiometabolic risks, lifestyle-associated stressors, inflammatory load, and recovery deficits.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="group relative p-8 rounded-3xl border border-border/50 hover:border-teal/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-teal to-sage flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-teal mb-4">
                  4️⃣ Personalized Medical Decision Support
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Our decision-support engine synthesizes your physiological profile with evidence-based medical guidelines to generate tailored recommendations.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  This includes adjustments in recovery strategies, movement protocols, stress regulation techniques, sleep optimization, nutrition timing, and long-term longevity interventions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Circadian Longevity Index */}
      <section className="py-24 px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight">
            Your Circadian Longevity Index
          </h2>
          <div className="space-y-6">
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Your biological age is not determined by years, but by how your internal systems function.
            </p>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Through chronobiological modeling, we evaluate the strength, regularity, and phase of your circadian rhythms — powerful predictors of long-term healthspan.
            </p>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              A lower index corresponds to improved resilience, metabolic stability, cardiovascular efficiency, and mood regulation.
            </p>
          </div>
          <div className="pt-8 p-8 border border-border/50 rounded-3xl bg-card/50">
            <div className="text-2xl font-light text-primary">
              Chronological Age: 36 | Circadian Biological Age: 31
            </div>
          </div>
        </div>
      </section>

      {/* 5. For Clinicians */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center">
            A Clinical Lens for Continuous Data
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            Our platform provides clinicians with structured, longitudinal insights that are difficult to observe in sporadic visits.
          </p>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            By integrating physiological, behavioral, and chronobiological metrics, clinicians gain:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm font-light text-muted-foreground">Early detection of deviations before they manifest as symptoms.</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm font-light text-muted-foreground">Clear visualization of patient-specific trends.</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm font-light text-muted-foreground">Support for preventive decision-making and individualized care.</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm font-light text-muted-foreground">Improved understanding of treatment adherence and response.</p>
            </div>
          </div>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center pt-8">
            This bridges the gap between continuous biosensing and evidence-based clinical practice.
          </p>
        </div>
      </section>

      {/* 6. Built on Evidence */}
      <section className="py-24 px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight">
            Scientific Rigor, Transparent Foundations
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed">
            Every recommendation is derived from validated clinical guidelines, peer-reviewed literature, and established physiological models.
          </p>
          <p className="text-lg font-light text-muted-foreground leading-relaxed">
            Our system aligns with cardiometabolic, circadian, and behavioral health research, enabling interventions consistent with modern standards of preventive and longevity medicine.
          </p>
        </div>
      </section>

      {/* 7. Longitudinal Evolution */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-teal to-sage flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center">
            Your Health Trajectory, Measured Every Day
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            We don't provide isolated suggestions.
          </p>
          <p className="text-lg font-light text-muted-foreground leading-relaxed text-center">
            Instead, we continuously evaluate how your body adapts over weeks and months, adjusting guidance based on your evolving biological patterns.
          </p>
          <p className="text-lg font-light text-primary text-center pt-4">
            Users report improvements in:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
            {['Energy stability', 'Sleep efficiency', 'Stress load reduction', 'Cardiovascular recovery', 'Circadian alignment', 'Overall sense of vitality'].map((item, idx) => (
              <div key={idx} className="text-center p-4 border border-border/50 rounded-2xl bg-card/50">
                <p className="text-sm font-light text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Designed for Individuals, Clinics, and Organizations */}
      <section className="py-24 px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center mb-16">
            Designed for Individuals, Clinics, and Health Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-border/50 rounded-3xl bg-card/50 text-center">
              <Users className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-primary mb-4">For Individuals</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Personalized longevity plans informed by real physiology, not generic advice.
              </p>
            </div>
            <div className="p-8 border border-border/50 rounded-3xl bg-card/50 text-center">
              <Stethoscope className="w-12 h-12 mx-auto mb-6 text-teal" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-teal mb-4">For Clinicians</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Objective, structured, longitudinal insights that enhance diagnostic precision and follow-up quality.
              </p>
            </div>
            <div className="p-8 border border-border/50 rounded-3xl bg-card/50 text-center">
              <Heart className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-primary mb-4">For Health Systems & Insurers</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Scalable preventive monitoring, risk stratification, and population health intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Partnerships & Trust */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight">
            Built with the Healthcare Ecosystem
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed">
            We collaborate with medical professionals, research institutions, and technology partners to ensure safety, accuracy, and clinical relevance.
          </p>
          <p className="text-lg font-light text-muted-foreground leading-relaxed">
            Our mission is to integrate continuous sensing with medical-grade interpretation to support preventive care at scale.
          </p>
        </div>
      </section>

      {/* 10. Call to Action */}
      <section className="py-24 px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight">
            Experience Precision Longevity
          </h2>
          <p className="text-xl font-light text-muted-foreground leading-relaxed">
            Unlock continuous insights into your health and discover how your body can age better, recover faster, and stay aligned with its natural rhythms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-light hover:bg-primary/90 transition-colors"
            >
              Join the Pilot Program
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/community')}
              className="px-8 py-3 border border-border rounded-md font-light hover:bg-muted/50 transition-colors"
            >
              Partner With Us
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="px-8 py-3 font-light hover:bg-muted/50 transition-colors"
            >
              For Medical Organizations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
