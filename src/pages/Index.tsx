import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const sectionAnimation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const cardHover = {
    whileHover: { y: -4 },
    transition: { type: "spring", stiffness: 160, damping: 18 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1. Hero Section */}
      <motion.section 
        className="pt-40 pb-24 px-8"
        {...sectionAnimation}
      >
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
      </motion.section>

      {/* 2. What We Do */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
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
      </motion.section>

      {/* 3. Designed for Individuals, Clinics, and Organizations */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center mb-16">
            Designed for Individuals, Clinics, and Health Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="p-8 border border-border/50 rounded-3xl bg-card/60 text-center"
              {...cardHover}
            >
              <Users className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-primary mb-4">For Individuals</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Personalized longevity plans informed by real physiology, not generic advice.
              </p>
            </motion.div>
            <motion.div 
              className="p-8 border border-border/50 rounded-3xl bg-card/60 text-center"
              {...cardHover}
            >
              <Stethoscope className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-primary mb-4">For Clinicians</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Objective, structured, longitudinal insights that enhance diagnostic precision and follow-up quality.
              </p>
            </motion.div>
            <motion.div 
              className="p-8 border border-border/50 rounded-3xl bg-card/60 text-center"
              {...cardHover}
            >
              <Heart className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-primary mb-4">For Health Systems & Insurers</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Scalable preventive monitoring, risk stratification, and population health intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. Explaining the Invisible */}
      <motion.section 
        className="py-24 px-6 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-primary text-center mb-4">
            Explaining the Invisible
          </h2>
          <p className="text-sm md:text-base font-light text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Three holographic layers that turn continuous physiological signals into medically meaningful, human-centered intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 – Data Collection & Standardization */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/60 bg-card/80 overflow-hidden"
              {...cardHover}
            >
              {/* HOLOGRAMA 1: Sensor constellation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Halo */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full border border-primary/25"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-28 h-28 rounded-full border border-primary/35"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />

                {/* Core */}
                <motion.div
                  className="relative w-16 h-16 rounded-full bg-primary/15 border border-primary/60"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-2 rounded-full bg-primary/30 blur-xl" />
                </motion.div>

                {/* Dispositivos orbitando */}
                <motion.div
                  className="absolute w-4 h-4 rounded-full bg-card border border-primary/60 flex items-center justify-center"
                  style={{ top: "20%", left: "18%" }}
                  animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                </motion.div>

                <motion.div
                  className="absolute w-5 h-5 rounded-full bg-card border border-primary/50 flex items-center justify-center"
                  style={{ top: "18%", right: "20%" }}
                  animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
                </motion.div>

                <motion.div
                  className="absolute w-4 h-4 rounded-full bg-card border border-primary/50 flex items-center justify-center"
                  style={{ bottom: "18%", left: "28%" }}
                  animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                </motion.div>

                {/* Pequeño haz que entra al núcleo */}
                <motion.div
                  className="absolute h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                  style={{ top: "52%", left: "10%" }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="relative z-10 mt-40">
                <h3 className="text-lg font-light text-primary mb-2">
                  1. Data Collection & Standardization
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  We securely collect signals from validated wearables, medical devices and clinical inputs, then normalize them into a unified health data model across sources and time.
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 – Advanced Analysis & Medical Intelligence */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/60 bg-card/80 overflow-hidden"
              {...cardHover}
            >
              {/* HOLOGRAMA 2: Body scanner */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Halo de datos */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full border border-primary/20"
                  animate={{ rotate: [0, 8, 0], opacity: [0.25, 0.45, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Cuerpo estilizado */}
                <div className="relative w-20 h-40 flex flex-col items-center">
                  {/* Head */}
                  <div className="w-10 h-10 rounded-full border border-primary/40 opacity-80 mb-1" />
                  {/* Torso */}
                  <div className="w-14 h-20 border border-primary/40 opacity-80 rounded-t-lg" />
                  {/* Lower body hint */}
                  <div className="w-10 h-6 border-t border-primary/25 opacity-60" />
                </div>

                {/* Barra de escaneo */}
                <motion.div
                  className="absolute w-28 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                  animate={{ y: [-40, 40, -40] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Puntos de dato */}
                <motion.div
                  className="absolute top-16 left-[52%] w-1.5 h-1.5 rounded-full bg-primary/70"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-24 right-[26%] w-1 h-1 rounded-full bg-primary/60"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                />
              </div>

              <div className="relative z-10 mt-40">
                <h3 className="text-lg font-light text-primary mb-2">
                  2. Advanced Analysis & Medical Intelligence
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-2">
                  Rule engines and medically-aligned AI models continuously interpret patterns in cardiovascular, circadian and behavioral signals to detect deviations and opportunities for intervention.
                </p>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Every day your body repairs itself — we measure how effectively that process is happening and where it can be improved.
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 – Personalized Patient & Clinician Experience */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/60 bg-card/80 overflow-hidden"
              {...cardHover}
            >
              {/* HOLOGRAMA 3: Human + devices conectados */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                {/* Holograma humano */}
                <motion.div
                  className="relative w-20 h-32 flex flex-col items-center"
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-primary/10 blur-lg rounded-full" />
                  <div className="w-9 h-9 rounded-full border border-primary/35 opacity-80 mb-1 relative z-10" />
                  <div className="w-14 h-16 border border-primary/35 opacity-80 rounded-t-lg relative z-10" />
                  <div className="w-9 h-5 border-t border-primary/25 opacity-60 relative z-10" />
                </motion.div>

                {/* Pantallas */}
                <div className="flex gap-3 relative z-10">
                  {/* Mobile */}
                  <div className="w-12 h-20 rounded-xl border border-primary/35 bg-gradient-to-b from-primary/15 to-transparent flex flex-col items-center justify-between p-2">
                    <div className="w-full h-1 rounded-full bg-primary/20 mt-2" />
                    <div className="w-8 h-2 rounded-full bg-primary/40" />
                    <div className="w-full h-1 rounded-full bg-primary/20 mb-2" />
                  </div>
                  {/* Web */}
                  <div className="w-20 h-16 rounded-xl border border-primary/25 bg-gradient-to-b from-primary/12 to-transparent flex flex-col justify-center gap-1.5 p-2">
                    <div className="w-12 h-1 rounded-full bg-primary/30" />
                    <div className="w-10 h-1 rounded-full bg-primary/22" />
                    <div className="w-14 h-1 rounded-full bg-primary/25" />
                  </div>
                </div>

                {/* Data pulse body → mobile → web */}
                <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 26 50 Q 40 46 50 50"
                    stroke="rgba(59,130,246,0.4)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 58 50 Q 70 46 82 50"
                    stroke="rgba(59,130,246,0.4)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <motion.circle
                    r="1.5"
                    fill="rgba(59,130,246,0.9)"
                    animate={{ cx: ["26%", "50%", "58%", "82%"], cy: ["50%", "50%", "50%", "50%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              <div className="relative z-10 mt-40">
                <h3 className="text-lg font-light text-primary mb-2">
                  3. Personalized Experience for Patients & Clinicians
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-2">
                  A patient-facing mobile app and a professional web platform deliver the right information to the right person — from meaningful feedback for the individual to longitudinal views for the physician.
                </p>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  We stay at your side continuously, turning complex data into clear, actionable insights for both the user and the medical team.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. How It Works — Four Pillars */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extralight text-primary tracking-tight text-center mb-16">
            How It Works — Four Pillars of the System
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/50 bg-card/60"
              {...cardHover}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  1️⃣ Continuous Physiological Acquisition
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  High-frequency data from validated biosensors: heart rhythm, blood pressure, sleep architecture, and autonomic load.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Signals reveal how your body responds, adapts, and recovers in real environments.
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/50 bg-card/60"
              {...cardHover}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  2️⃣ Circadian and Biological Rhythm Analysis
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Advanced chronobiological models quantify synchrony of internal clocks — sleep-wake cycles, metabolic rhythms, and autonomic balance.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Estimates your <strong>biological age of circadian function</strong>, a sensitive marker of healthspan and resilience.
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/50 bg-card/60"
              {...cardHover}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  3️⃣ Clinical Knowledge Interpretation
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Converts unstructured symptoms, notes, and self-reports into structured medical concepts.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Maps relevant patterns: cardiometabolic risks, lifestyle stressors, inflammatory load, and recovery deficits.
                </p>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-border/50 bg-card/60"
              {...cardHover}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-primary mb-4">
                  4️⃣ Personalized Medical Decision Support
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">
                  Synthesizes your physiological profile with evidence-based medical guidelines to generate tailored recommendations.
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Includes recovery strategies, movement protocols, stress regulation, sleep optimization, and longevity interventions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. Circadian Longevity Index */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
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
          <motion.div 
            className="pt-8 p-8 border border-border/50 rounded-3xl bg-card/60"
            {...cardHover}
          >
            <div className="text-2xl font-light text-primary">
              Chronological Age: 36 | Circadian Biological Age: 31
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. For Clinicians */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
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
      </motion.section>

      {/* 8. Built on Evidence */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
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
      </motion.section>

      {/* 9. Longitudinal Evolution */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
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
              <motion.div 
                key={idx} 
                className="text-center p-4 border border-border/50 rounded-2xl bg-card/60"
                {...cardHover}
              >
                <p className="text-sm font-light text-muted-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 10. Partnerships & Trust */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
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
      </motion.section>

      {/* 11. Call to Action */}
      <motion.section 
        className="py-24 px-8 bg-background border-t border-border/40"
        {...sectionAnimation}
      >
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
      </motion.section>
    </div>
  );
};

export default Index;
