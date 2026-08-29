interface BlogPostProps {
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  slug: string;
}

interface BlogPreviewProps {
  posts: BlogPostProps[];
}

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Latest Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-bg-surface/90 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden shadow-resting hover:border-white/10 hover:shadow-lifted transition-all duration-300 group"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-text-primary tracking-tighter mb-4">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-3 mb-5 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5 text-xs">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-bg-surface-light text-accent-tech-pale text-xs font-medium tracking-wide px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                  <span className="flex items-center space-x-1">
                    {/* Optional calendar icon */}
                    {/* {typeof CalendarIcon !== 'undefined' && <CalendarIcon className="h-3 w-3" />} */}
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                  <a
                    href={`${import.meta.env.BASE_URL}blog/${post.slug}`}
                    className="font-medium text-accent-tech-light hover:underline underline-offset-4 transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={`${import.meta.env.BASE_URL}blog`}
            className="text-accent-tech-light hover:underline underline-offset-4 font-medium transition-colors"
          >
            View All Blog Posts →
          </a>
        </div>
      </div>
    </section>
  );
};