import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import Header from '@/components/Header';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

interface Post {
  slug: string;
  title: string;
  date: string;
  series: string;
  tags: string[];
}

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
        const postsList: Post[] = [
          {
            slug: 'the-future-of-health-data',
            title: 'The Future of Health Data',
            date: '2025-02-01',
            series: 'Industry Insights',
            tags: ['interoperability', 'AI', 'privacy', 'future']
          },
          {
            slug: 'building-secure-health-platforms',
            title: 'Building Secure Health Platforms',
            date: '2025-01-20',
            series: 'Security',
            tags: ['security', 'encryption', 'best-practices']
          },
          {
            slug: 'welcome-to-the-blog',
            title: 'Welcome to Our Blog',
            date: '2025-01-15',
            series: 'Getting Started',
            tags: ['introduction', 'community', 'announcements']
          }
        ];
        
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
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <h1 className="text-5xl font-normal text-black mb-8 tracking-tight">
            Community
          </h1>
          
          {/* Minimalist Filter Bar */}
          <div className="sticky top-20 bg-white z-10 pb-4 mb-6 border-b border-[#E5E5E5]">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Input - Primary */}
              <input
                type="text"
                placeholder="Search posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-[#E5E5E5] text-black placeholder-gray-400 hover:bg-[#F7F7F7] focus:outline-none focus:border-black transition-colors"
              />
              
              {/* Series Dropdown */}
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E5E5E5] text-black hover:bg-[#F7F7F7] focus:outline-none focus:border-black transition-colors cursor-pointer md:w-48"
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
                  className="w-full px-4 py-3 bg-white border border-[#E5E5E5] text-black hover:bg-[#F7F7F7] focus:outline-none focus:border-black transition-colors cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{selectedTags.size === 0 ? 'All Tags' : `${selectedTags.size} selected`}</span>
                  <span className="text-gray-500">▼</span>
                </button>
                
                {showTagsDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] max-h-64 overflow-y-auto z-20">
                    {allTags.map(tag => (
                      <label
                        key={tag}
                        className="flex items-center px-4 py-2 hover:bg-[#F7F7F7] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.has(tag)}
                          onChange={() => toggleTag(tag)}
                          className="mr-2"
                        />
                        <span className="text-black text-sm">{tag}</span>
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
                <p className="text-gray-500">No posts match the selected filters.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="cursor-pointer group py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded"
                  onClick={() => navigate(`/community/${post.slug}`)}
                >
                  <h2 className="text-2xl font-normal text-black mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span className="text-gray-700">{post.series}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
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
