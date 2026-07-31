interface ProjectProps {
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  slug: string;
  demoUrl?: string;
  sourceUrl?: string;
  techStack: string[];
}

interface ProjectGridProps {
  projects: ProjectProps[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-white/90 backdrop-blur-sm border border-gray-100/50 rounded-lg overflow-hidden hover:border-gray-200/70 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tighter mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="bg-ai-gray-50 text-ai-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-ai-cyan-50 text-ai-cyan-800 text-xs font-medium px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 space-x-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-ai-indigo-600 hover:bg-ai-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-ai-indigo-600 hover:bg-ai-indigo-50 text-ai-indigo-600 font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Source
                    </a>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                  <span>{new Date(project.pubDate).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}</span>
                  <a
                    href={`${import.meta.env.BASE_URL}projects/${project.slug}`}
                    className="font-medium text-ai-indigo-600 hover:text-ai-indigo-800 transition-colors hover:underline"
                  >
                    View project →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={`${import.meta.env.BASE_URL}projects`}
            className="text-ai-indigo-600 hover:text-ai-indigo-800 font-medium transition-colors"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
};