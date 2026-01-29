import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/auth";
import Header from "@/components/Header";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";
import HealthVisuals from "@/components/HealthVisuals";
import { loadRecentPosts, type Post } from "@/utils/posts";

const MainPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadRecentPosts(5);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const postsFromLastWeek = posts.filter((post) => {
          const postDate = new Date(post.date);
          return postDate >= oneWeekAgo;
        });

        setRecentPosts(postsFromLastWeek);
      } catch (error) {
        console.error("Error loading posts:", error);
        setRecentPosts([]);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">
              Healthcare technology insights from the community
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Secure health data synchronization platform powered by community
              knowledge
            </p>
            <button
              onClick={() => navigate("/community")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-normal hover:bg-primary/90 transition-colors"
            >
              Explore Community Insights
            </button>
          </div>
        </section>

        {/* Explaining the Invisible - Visual Section */}
        <HealthVisuals />

        {/* Recent Contributions Section - Only show if there are posts from the last week */}
        {recentPosts.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 tracking-tight text-foreground">
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
        )}

        {/* Bottom CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-foreground">
              Join the Community
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Be part of the conversation shaping the future of healthcare
              technology
            </p>
            <button
              onClick={() => navigate("/login")}
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

export default MainPage;
