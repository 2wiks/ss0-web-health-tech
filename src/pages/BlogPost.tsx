import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';

interface PostData {
  title: string;
  date: string;
  content: string;
}

// Manual frontmatter parser for browser compatibility
function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: markdown };
  }
  
  const frontmatter = match[1];
  const content = match[2];
  
  const data: Record<string, string | string[]> = {};
  const lines = frontmatter.split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle arrays like tags: ["tag1", "tag2"]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        data[key] = arrayContent.split(',').map(item => 
          item.trim().replace(/^["']|["']$/g, '')
        );
      } else {
        value = value.replace(/^["']|["']$/g, '');
        data[key] = value;
      }
    }
  });
  
  return { data, content };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`);
        
        if (!response.ok) {
          throw new Error(`Post not found: ${response.status} ${response.statusText}`);
        }
        
        const text = await response.text();
        const { data, content } = parseFrontmatter(text);
        
        setPost({
          title: Array.isArray(data.title) ? data.title[0] : data.title,
          date: Array.isArray(data.date) ? data.date[0] : data.date,
          content
        });
      } catch (error) {
        console.error('Error loading post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading post...</p>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <h1 className="text-3xl font-bold text-black mb-4">Post Not Found</h1>
            <p className="text-gray-500 mb-8">
              The post you're looking for doesn't exist or couldn't be loaded.
              Check the browser console for details.
            </p>
            <button
              onClick={() => navigate('/community')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Community
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-8 py-32">
          <button
            onClick={() => navigate('/community')}
            className="text-sm text-gray-500 hover:text-black mb-12 transition-colors"
          >
            ← Back to Community
          </button>
          
          <header className="mb-12">
            <h1 className="text-3xl font-normal text-black mb-4 tracking-tight leading-tight">
              {post.title}
            </h1>
            <time className="text-sm text-gray-500">
              {formatDate(post.date)}
            </time>
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-normal text-black mt-10 mb-5 tracking-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-normal text-black mt-8 mb-3 tracking-tight" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-normal text-black mt-6 mb-2 tracking-tight" {...props} />,
                p: ({node, ...props}) => <p className="text-base text-black leading-relaxed mb-5" {...props} />,
                ul: ({node, ...props}) => <ul className="text-base text-black leading-relaxed mb-5 ml-6 list-disc" {...props} />,
                ol: ({node, ...props}) => <ol className="text-base text-black leading-relaxed mb-5 ml-6 list-decimal" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-6 italic text-gray-700 my-6" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-6" {...props} />,
                a: ({node, ...props}) => <a className="text-black underline hover:opacity-60 transition-opacity" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;

