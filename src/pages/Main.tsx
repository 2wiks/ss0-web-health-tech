import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import Header from '@/components/Header';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import { Logo } from '@/components/Logo';
import { Shield, Activity, Database, ArrowRight } from 'lucide-react';
import HealthVisuals from '@/components/HealthVisuals';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  series: string;
  tags: string[];
}

const Main = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Load posts - in production these would come from an API or auto-generated
    const allPosts: Post[] = [
      {
        slug: 'circadian-longevity-index',
        title: 'Your Circadian Longevity Index',
        date: '2025-03-20',
        excerpt: 'Your biological age is not determined by years, but by how your internal systems function. Through chronobiological modeling, we evaluate the strength, regularity, and phase of your circadian rhythms — powerful predictors of long-term healthspan.',
        series: 'Longevity Science',
        tags: ['circadian', 'biological-age', 'chronobiology', 'longevity', 'healthspan']
      },
      {
        slug: 'longitudinal-health-monitoring',
        title: 'Your Health Trajectory, Measured Every Day',
        date: '2025-03-18',
        excerpt: 'We don\'t provide isolated suggestions. Instead, we continuously evaluate how your body adapts over weeks and months, adjusting guidance based on your evolving biological patterns.',
        series: 'Health Monitoring',
        tags: ['longitudinal', 'tracking', 'adaptation', 'continuous-monitoring', 'health-trajectory']
      },
      {
        slug: 'clinical-grade-interpretation',
        title: 'A Clinical Lens for Continuous Data',
        date: '2025-03-15',
        excerpt: 'Our platform provides clinicians with structured, longitudinal insights that are difficult to observe in sporadic visits. By integrating physiological, behavioral, and chronobiological metrics, clinicians gain early detection capabilities.',
        series: 'Clinical Applications',
        tags: ['clinicians', 'longitudinal', 'diagnostics', 'preventive-care', 'medical-professionals']
      },
      {
        slug: 'four-pillars-of-health-intelligence',
        title: 'Four Pillars of Health Intelligence',
        date: '2025-03-12',
        excerpt: 'Our platform integrates four core systems that work together to transform raw physiological data into actionable, clinically-aligned insights. Each pillar represents a critical layer of health intelligence.',
        series: 'System Architecture',
        tags: ['physiology', 'circadian', 'clinical', 'decision-support', 'AI']
      },
      {
        slug: 'evidence-based-longevity',
        title: 'Scientific Rigor, Transparent Foundations',
        date: '2025-03-10',
        excerpt: 'Every recommendation is derived from validated clinical guidelines, peer-reviewed literature, and established physiological models. Our system aligns with cardiometabolic, circadian, and behavioral health research.',
        series: 'Research & Science',
        tags: ['evidence-based', 'clinical-guidelines', 'peer-reviewed', 'research', 'longevity']
      },
      {
        slug: 'the-future-of-health-data',
        title: 'The Future of Health Data',
        date: '2025-02-01',
        excerpt: 'The landscape of health data management is changing rapidly. Interoperability, patient empowerment, and AI-driven analytics are reshaping healthcare.',
        series: 'Industry Insights',
        tags: ['interoperability', 'AI', 'privacy', 'future']
      },
      {
        slug: 'building-secure-health-platforms',
        title: 'Building Secure Health Platforms',
        date: '2025-01-20',
        excerpt: 'Security is paramount when dealing with health data. We explore key principles including data encryption, access control, and audit trails.',
        series: 'Security',
        tags: ['security', 'encryption', 'best-practices']
      },
      {
        slug: 'welcome-to-the-blog',
        title: 'Welcome to Our Community',
        date: '2025-01-15',
        excerpt: 'Join us as we share insights, updates, and thoughts on health technology innovations, best practices, and technical deep dives.',
        series: 'Getting Started',
        tags: ['introduction', 'community', 'announcements']
      }
    ];

    // Sort by date (most recent first)
    const sortedPosts = allPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setRecentPosts(sortedPosts.slice(0, 5)); // Show only last 5 posts
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {isAuthenticated ? <AuthenticatedHeader /> : <Header />}
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Logo className="h-16 w-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
              Healthcare technology insights from the community
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Secure health data synchronization platform powered by community knowledge
            </p>
            <button
              onClick={() => navigate('/community')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-normal hover:bg-primary/90 transition-colors"
            >
              Explore Community Insights
            </button>
          </div>
        </section>

        {/* Explaining the Invisible - Visual Section */}
        <HealthVisuals />

        {/* Recent Contributions Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-foreground">
              Latest from the Community
            </h2>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => navigate(`/community/${post.slug}`)}
                  className="bg-card p-6 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 tracking-tight text-card-foreground">
                        {post.title}
                      </h3>
                      <p className="text-sm mb-3 line-clamp-2 text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-1 text-muted-foreground" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-Projects Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-foreground">
              Health Innovation Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-8 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="mb-6">
                  <Shield className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-card-foreground">
                  Secure Authentication
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Protected with industry-standard token-based security and encryption protocols
                </p>
              </div>

              <div className="bg-card p-8 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="mb-6">
                  <Activity className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-card-foreground">
                  Real-time Sync
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Seamlessly synchronize health data across platforms with real-time updates
                </p>
              </div>

              <div className="bg-card p-8 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="mb-6">
                  <Database className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-card-foreground">
                  Multiple Categories
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Support for various health metrics and data types across multiple platforms
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-foreground">
              Join the Community
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Be part of the conversation shaping the future of healthcare technology
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-normal hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;
