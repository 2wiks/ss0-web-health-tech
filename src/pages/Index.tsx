import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Activity } from 'lucide-react';
import logo from '@/assets/hacking-health-logo.png';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Futuristic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="Hacking Health" className="h-12 w-auto" />
            </div>
            <nav className="flex items-center gap-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-sm font-light text-muted-foreground hover:text-primary transition-colors"
              >
                home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-sm font-light bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20"
              >
                login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-8 pt-40 pb-24">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-extralight text-primary tracking-tighter">
              hacking health
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto tracking-tight">
              secure health data synchronization platform
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="group relative p-10 rounded-3xl glass-card border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-normal text-base mb-3 text-primary">secure authentication</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  protected with industry-standard token-based security
                </p>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl glass-card border border-teal/20 hover:border-teal/40 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal to-sage flex items-center justify-center">
                  <Activity className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-normal text-base mb-3 text-teal">real-time sync</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  seamlessly synchronize health data across platforms
                </p>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl glass-card border border-accent/20 hover:border-accent/40 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-sage flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-normal text-base mb-3 text-accent">multiple categories</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  support for various health metrics and data types
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
