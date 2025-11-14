// Utility to load and parse posts from /public/posts

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  series: string;
  tags: string[];
}

// Manual frontmatter parser (same as BlogPost.tsx)
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

// Extract excerpt from content (first paragraph or first 200 characters)
function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown headers, code blocks, etc.
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
    .trim();
  
  // Get first paragraph or first maxLength characters
  const firstParagraph = plainText.split('\n\n')[0] || plainText;
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }
  
  // Truncate at word boundary
  const truncated = firstParagraph.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

// Generate slug from filename
function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

// Load a single post by filename
async function loadPost(filename: string): Promise<Post | null> {
  try {
    const slug = getSlugFromFilename(filename);
    const response = await fetch(`/posts/${filename}`);
    
    if (!response.ok) {
      return null;
    }
    
    const text = await response.text();
    const { data, content } = parseFrontmatter(text);
    
    const title = Array.isArray(data.title) ? data.title[0] : (data.title as string) || '';
    const date = Array.isArray(data.date) ? data.date[0] : (data.date as string) || '';
    const series = Array.isArray(data.series) ? data.series[0] : (data.series as string) || 'Uncategorized';
    const tags = Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? [data.tags] : []);
    const excerpt = extractExcerpt(content);
    
    // Validate required fields
    if (!title || !date) {
      console.warn(`Post ${filename} is missing required fields (title or date)`);
      return null;
    }
    
    return {
      slug,
      title,
      date,
      excerpt,
      series,
      tags
    };
  } catch (error) {
    console.error(`Error loading post ${filename}:`, error);
    return null;
  }
}

// Load all posts from the posts directory
// Since we can't list directories in the browser, we maintain a list of post filenames
// This list can be manually updated or generated at build time
export async function loadAllPosts(): Promise<Post[]> {
  // Try to load a posts index file first
  try {
    const indexResponse = await fetch('/posts/index.json');
    if (indexResponse.ok) {
      const index = await indexResponse.json();
      const posts = await Promise.all(
        index.files.map((filename: string) => loadPost(filename))
      );
      return posts.filter((post): post is Post => post !== null);
    }
  } catch (error) {
    // If index.json doesn't exist, we'll use a fallback approach
    console.log('No posts index.json found, using fallback');
  }
  
  // Fallback: Try to discover posts by attempting common filenames
  // This is a simple approach - in production you might want to generate index.json at build time
  const commonPosts = [
    'the-future-of-health-data.md',
    // Add more post filenames here as they are created
  ];
  
  const posts = await Promise.all(
    commonPosts.map(filename => loadPost(filename))
  );
  
  return posts.filter((post): post is Post => post !== null);
}

// Load posts and sort by date (most recent first)
export async function loadRecentPosts(limit?: number): Promise<Post[]> {
  const allPosts = await loadAllPosts();
  
  // Sort by date (most recent first)
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

