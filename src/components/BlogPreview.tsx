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
              className="bg-bg-surface/90 backdrop-blur-sm border border-gray-100/50 rounded-lg overflow-hidden hover:border-gray-200/70 hover:shadow-lg transition-all duration-300 group"
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
                    <span key={tag} className="bg-accent-tech/20 text-accent-tech text-xs font-medium px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                  <span className="flex items-center space-x-1">
                    {/* Optional calendar icon */}
                    {/* {typeof CalendarIcon !== 'undefined' && <CalendarIcon className="h-3 w-3" />} */}
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                  <a
                    href={`${import.meta.env.BASE_URL}blog/${post.slug}`}
                    className="font-medium text-accent-tech hover:text-accent-tech/80 transition-colors hover:underline"
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
            className="text-accent-tech hover:text-accent-tech/80 font-medium transition-colors"
          >
            View All Blog Posts →
          </a>
        </div>
      </div>
    </section>
  );
};