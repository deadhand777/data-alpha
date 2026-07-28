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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                <div class="flex flex-wrap gap-2 mb-4 text-xs">
                  {post.tags.map((tag) => (
                    <span key={tag} class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <a href={`/blog/${post.slug}`} class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="mt-8 text-center">
          <a href="/blog" class="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View All Blog Posts →
          </a>
        </div>
      </div>
    </section>
  );
};