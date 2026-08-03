export const HeroSection = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Data, AI & Finance Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring the intersection of data science, artificial intelligence,
            and financial analysis through practical tutorials and project showcases.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href={`${import.meta.env.BASE_URL}blog`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Read Latest Blog
            </a>
            <a
              href={`${import.meta.env.BASE_URL}projects`}
              className="border border-indigo-600 hover:bg-indigo-50 text-indigo-600 font-medium py-3 px-6 rounded-md transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
