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
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Featured Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-bg-surface/90 backdrop-blur-sm border border-gray-100/50 rounded-lg overflow-hidden hover:border-gray-200/70 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-text-primary tracking-tighter mb-3">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="bg-accent-tech/20 text-accent-tech text-xs font-medium px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-accent-tech/20 text-accent-tech text-xs font-medium px-2 py-0.5 rounded">
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
                      className="bg-accent-success hover:bg-accent-success/80 text-white font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-accent-success hover:bg-accent-success/10 text-accent-success font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Source
                    </a>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary mt-4">
                  <span>{new Date(project.pubDate).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}</span>
                  <a
                    href={`${import.meta.env.BASE_URL}projects/${project.slug}`}
                    className="font-medium text-accent-tech hover:text-accent-tech/80 transition-colors hover:underline"
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
            className="text-accent-tech hover:text-accent-tech/80 font-medium transition-colors"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
};