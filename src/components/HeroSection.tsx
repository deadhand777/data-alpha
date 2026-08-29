export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl mb-6 text-balance">
            Data, AI & Finance Insights
          </h1>
          <p className="text-xl leading-relaxed text-text-secondary max-w-2xl mx-auto">
            Exploring the intersection of data science, artificial intelligence,
            and financial analysis through practical tutorials and project showcases.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href={`${import.meta.env.BASE_URL}blog`}
              className="bg-accent-tech-dark hover:bg-accent-tech-deep text-text-primary font-medium py-3 px-6 rounded-md shadow-resting hover:shadow-lifted hover:-translate-y-px transition-all duration-200"
            >
              Read Latest Blog
            </a>
            <a
              href={`${import.meta.env.BASE_URL}projects`}
              className="border border-accent-tech text-accent-tech-light hover:text-accent-tech-pale hover:bg-bg-surface-light hover:border-accent-tech-light font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
