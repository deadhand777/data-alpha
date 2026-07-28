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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.slug} class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                {project.techStack.length > 0 && (
                  <div class="flex flex-wrap gap-2 mb-4 text-xs">
                    {project.techStack.map((tech) => (
                      <span key={tech} class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div class="flex flex-wrap gap-2 mb-4 text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div class="mt-4 space-x-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="border border-indigo-600 hover:bg-indigo-50 text-indigo-600 font-medium py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      Source
                    </a>
                  )}
                </div>
                <div class="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <span>{new Date(project.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <a href={`/projects/${project.slug}`} class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    View project →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="mt-8 text-center">
          <a href="/projects" class="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
};