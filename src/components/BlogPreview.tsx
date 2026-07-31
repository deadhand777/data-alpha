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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-white/90 backdrop-blur-sm border border-gray-100/50 rounded-lg overflow-hidden hover:border-gray-200/70 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-4">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-5 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5 text-xs">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                  <span className="flex items-center space-x-1">
                    {/* Optional calendar icon */}
                    {/* {typeof CalendarIcon !== 'undefined' && <CalendarIcon className="h-3 w-3" />} */}
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                  <a
                    href={`${import.meta.env.BASE_URL}blog/${post.slug}`}
                    className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors hover:underline"
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
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View All Blog Posts →
          </a>
        </div>
      </div>
    </section>
  );
};