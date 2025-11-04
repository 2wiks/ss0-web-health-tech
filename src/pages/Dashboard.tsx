import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import { userService } from '@/api/user';
import { syncService } from '@/api/sync';
import { Heart, Activity, Droplets, Moon } from 'lucide-react';
import HealthCategories from '@/components/HealthCategories';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

type MetricMethod = 'heartRate' | 'weight' | 'oxygenSaturation' | 'steps';

type MetricConfig = {
  method: MetricMethod;
  label: string;
  icon: any;
  unit: string; // visual
  gradient: string;
  bg: string;
};

type MetricCard = MetricConfig & { value: string | number | null };

const Dashboard = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState<string>('there');
  const [loading, setLoading] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<MetricCard[]>([]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const metricConfigs: MetricConfig[] = useMemo(
    () => [
      { method: 'heartRate', label: 'heart rate', icon: Heart, unit: 'bpm', gradient: 'from-destructive to-destructive/80', bg: 'bg-destructive/10' },
      { method: 'weight', label: 'weight', icon: Activity, unit: 'kg', gradient: 'from-teal to-sage', bg: 'bg-teal/10' },
      { method: 'oxygenSaturation', label: 'oxygen', icon: Droplets, unit: '%', gradient: 'from-primary to-teal', bg: 'bg-primary/10' },
      { method: 'steps', label: 'steps', icon: Moon, unit: 'today', gradient: 'from-accent to-sage', bg: 'bg-accent/10' },
    ],
    []
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) Nombre dinámico
        try {
          const me = await userService.getCurrentUser();
          const nameGuess =
            me.name?.trim() ||
            me.username?.trim() ||
            (me.email ? me.email.split('@')[0] : '') ||
            'there';
          if (!cancelled) setDisplayName(nameGuess);
        } catch {
          if (!cancelled) setDisplayName('there');
        }

        // 2) Últimas métricas (últimos N días; luego elegimos la fecha más reciente)
        const DAYS_BACK = 14;

        const results = await Promise.all(
          metricConfigs.map((cfg) =>
            syncService.fetchData(cfg.method, { daysBack: DAYS_BACK })
          )
        );

        const cards: MetricCard[] = metricConfigs.map((cfg, idx) => {
          const r = results[idx];
          const docs = (r.success && r.data) ? r.data : [];

          // Elegir doc más reciente por campo 'date' (YYYY-MM-DD). Si tu backend usa _id como fecha, puedes comparar _id.
          docs.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
          const latest = docs[docs.length - 1];

          const value = extractLatestValue(cfg.method, latest);
          const pretty = formatValue(value, cfg.method);

          return { ...cfg, value: pretty };
        });

        if (!cancelled) setMetrics(cards);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [metricConfigs]);

  return (
    <div className="min-h-screen bg-white">
      <AuthenticatedHeader />

      {/* Main Content */}
      <main className="container mx-auto px-8 pt-32 pb-16">
        {/* Greeting */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-normal text-black mb-2 tracking-tight">
            Hello, {displayName}
          </h1>
          <p className="text-lg font-normal" style={{ color: '#6E6E6E' }}>
            Monitor your health metrics
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(loading ? skeletonMetrics(metricConfigs) : metrics).map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-md bg-white border border-[#E5E5E5] hover:border-black transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-normal uppercase tracking-widest" style={{ color: '#6E6E6E' }}>
                      {metric.label}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-black" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-normal text-black tracking-tight">
                      {metric.value ?? '—'}
                    </span>
                    <span className="text-sm font-normal" style={{ color: '#6E6E6E' }}>
                      {metric.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health Categories */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-2xl font-normal text-black mb-8 tracking-tight">Health Data Categories</h2>
          <HealthCategories />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

/* ---------- helpers ---------- */

function pickNumber(...vals: any[]): number | null {
  for (const v of vals) {
    if (typeof v === 'number' && !Number.isNaN(v)) return v;
    // cadenas numéricas
    if (typeof v === 'string' && v.trim() && !Number.isNaN(Number(v))) return Number(v);
  }
  return null;
}

function extractLatestValue(method: MetricMethod, latestDoc?: any): number | null {
  if (!latestDoc) return null;
  const agg = latestDoc.aggregate || {};

  // 1) Intento con agregados típicos
  let v =
    pickNumber(agg.value, agg.dailyAvg, agg.dailyAverage, agg.dailyMax) ??
    (method === 'steps' ? pickNumber(agg.total, agg.totalSamples) : null);

  // 2) Si no hay agregado, intento con última medición cruda
  if (v == null && Array.isArray(latestDoc.measurements) && latestDoc.measurements.length) {
    const m = latestDoc.measurements[latestDoc.measurements.length - 1];
    // intenta diferentes campos comunes
    v = pickNumber(m?.data?.value, m?.data?.avg, m?.data?.amount, m?.value);
  }

  // 3) Pasos: preferir 'total' del día si existe
  if (method === 'steps') {
    v = pickNumber(agg.total, v);
  }

  return v;
}

function formatValue(v: number | null, method: MetricMethod): string | number | null {
  if (v == null) return null;
  if (method === 'steps') return Math.round(v).toLocaleString();
  if (method === 'weight') return Number(v.toFixed(1));
  if (method === 'oxygenSaturation') return Math.round(v);
  if (method === 'heartRate') return Math.round(v);
  return v;
}

function skeletonMetrics(configs: MetricConfig[]): MetricCard[] {
  return configs.map((c) => ({ ...c, value: '…' }));
}
