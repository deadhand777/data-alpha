interface ProjectProps {
  title: string;
  description: string;
  dateLabel: string;
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
              className="bg-bg-surface/90 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden shadow-resting hover:border-white/10 hover:shadow-lifted transition-all duration-300 group"
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
                      <span key={tech} className="bg-bg-surface-light text-accent-tech-pale text-xs font-medium tracking-wide px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-bg-surface-light text-accent-tech-pale text-xs font-medium tracking-wide px-2 py-0.5 rounded">
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
                      className="inline-block bg-accent-tech-dark hover:bg-accent-tech-deep text-text-primary text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-accent-tech text-accent-tech-light hover:text-accent-tech-pale hover:bg-bg-surface-light text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Source
                    </a>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted mt-4">
                  <span>{project.dateLabel}</span>
                  <a
                    href={`${import.meta.env.BASE_URL}projects/${project.slug}`}
                    className="font-medium text-accent-tech-light hover:underline underline-offset-4 transition-colors"
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
            className="text-accent-tech-light hover:underline underline-offset-4 font-medium transition-colors"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
};
