import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import Header from '@/components/Header';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import { loadAllPosts, type Post } from '@/utils/posts';

const Blog = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allSeries, setAllSeries] = useState<string[]>([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsList = await loadAllPosts();
        
        setPosts(postsList);
        
        // Extract unique series and tags
        const seriesSet = new Set(postsList.map(p => p.series));
        const tagsSet = new Set(postsList.flatMap(p => p.tags));
        
        setAllSeries(Array.from(seriesSet).sort());
        setAllTags(Array.from(tagsSet).sort());
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredPosts = posts.filter(post => {
    // Search filter
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Series filter
    const seriesMatch = selectedSeries === 'all' || post.series === selectedSeries;
    
    // Tags filter
    const tagsMatch = selectedTags.size === 0 || 
      Array.from(selectedTags).some(tag => post.tags.includes(tag));
    
    return searchMatch && seriesMatch && tagsMatch;
  });

  const toggleTag = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <>
      {isAuthenticated ? <AuthenticatedHeader /> : <Header />}
      <div className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <h1 className="text-4xl font-normal text-foreground mb-8 tracking-tight">
            Community
          </h1>
          
          {/* Minimalist Filter Bar */}
          <div className="sticky top-20 bg-background z-10 pb-4 mb-6 border-b border-border">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Input - Primary */}
              <input
                type="text"
                placeholder="Search posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-background border border-input text-foreground placeholder:text-muted-foreground hover:bg-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
              
              {/* Series Dropdown */}
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-4 py-3 bg-background border border-input text-foreground hover:bg-muted/50 focus:outline-none focus:border-primary transition-colors cursor-pointer md:w-48"
              >
                <option value="all">All Series</option>
                {allSeries.map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
              
              {/* Tags Dropdown */}
              <div className="relative md:w-48">
                <button
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                  className="w-full px-4 py-3 bg-background border border-input text-foreground hover:bg-muted/50 focus:outline-none focus:border-primary transition-colors cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{selectedTags.size === 0 ? 'All Tags' : `${selectedTags.size} selected`}</span>
                  <span className="text-muted-foreground">▼</span>
                </button>
                
                {showTagsDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border max-h-64 overflow-y-auto z-20">
                    {allTags.map(tag => (
                      <label
                        key={tag}
                        className="flex items-center px-4 py-2 hover:bg-muted/50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.has(tag)}
                          onChange={() => toggleTag(tag)}
                          className="mr-2"
                        />
                        <span className="text-card-foreground text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts match the selected filters.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="cursor-pointer group py-6 border-b border-border hover:bg-muted/30 transition-colors px-4 -mx-4 rounded"
                  onClick={() => navigate(`/community/${post.slug}`)}
                >
                  <h2 className="text-2xl font-normal text-foreground mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span className="text-foreground">{post.series}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-foreground text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
