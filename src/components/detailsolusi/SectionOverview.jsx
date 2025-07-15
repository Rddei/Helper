export default function SectionOverview({ title, description }) {
  return (
    <div id="overview" className="mb-16 scroll-mt-28">
      <h1 className="text-3xl md:text-5xl font-bold font-alexandria text-white mb-6">
        {title}
      </h1>
      <p className="text-lg font-inter-tight text-justify whitespace-pre-line leading-7">
        {description}
      </p>
    </div>
  );
}
