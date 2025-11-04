import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Droplet, Moon, TrendingUp, Footprints, Flame, Thermometer, Weight } from 'lucide-react';

const HealthCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'active calories', method: 'activeCaloriesBurned', icon: Flame, gradient: 'from-destructive to-destructive/80', bg: 'bg-destructive/10' },
    { name: 'body temperature', method: 'basalBodyTemperature', icon: Thermometer, gradient: 'from-accent to-accent/80', bg: 'bg-accent/10' },
    { name: 'blood pressure', method: 'bloodPressure', icon: Activity, gradient: 'from-primary to-teal', bg: 'bg-primary/10' },
    { name: 'heart rate', method: 'heartRate', icon: Heart, gradient: 'from-destructive to-destructive/70', bg: 'bg-destructive/10' },
    { name: 'hydration', method: 'hydration', icon: Droplet, gradient: 'from-teal to-sage', bg: 'bg-teal/10' },
    { name: 'sleep session', method: 'sleepSession', icon: Moon, gradient: 'from-accent to-sage', bg: 'bg-accent/10' },
    { name: 'steps', method: 'steps', icon: Footprints, gradient: 'from-sage to-teal', bg: 'bg-sage/10' },
    { name: 'vo2 max', method: 'vo2Max', icon: TrendingUp, gradient: 'from-teal to-primary', bg: 'bg-teal/10' },
    { name: 'weight', method: 'weight', icon: Weight, gradient: 'from-primary to-secondary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <div
            key={category.method}
            className="group relative p-8 rounded-3xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer hover:scale-105"
            onClick={() => navigate(`/category/${category.method}`)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-6">
                <div className={`w-12 h-12 rounded-2xl ${category.bg} flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-light text-base text-primary">{category.name}</h3>
              </div>
              <div className="flex justify-end">
                <span className="text-xs font-light text-muted-foreground group-hover:text-primary transition-colors tracking-wide">
                  view data →
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HealthCategories;
