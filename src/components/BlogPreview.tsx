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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <a href={`${import.meta.env.BASE_URL}blog/${post.slug}`} className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={`${import.meta.env.BASE_URL}blog`} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View All Blog Posts →
          </a>
        </div>
      </div>
    </section>
  );
};
