const SHORT_FORM_VIDEOS = [
  "https://play.gumlet.io/embed/698b85defc23d3d76fd0f5fb?background=false&autoplay=true&loop=true&disable_player_controls=false",
  "https://play.gumlet.io/embed/698b896aaec3d4e420ebc25f?background=false&autoplay=true&loop=true&disable_player_controls=false",
  "https://play.gumlet.io/embed/68f857da24f455e32d0d96bb?background=false&autoplay=true&loop=true&disableControls=false",
  "https://play.gumlet.io/embed/68f857da368a81dfff8cedf2?background=false&autoplay=true&loop=true&disableControls=false",
];

export default function ShortForm() {
  return (
    <section
      id="short-form"
      className="py-16 md:py-24 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SHORT_FORM_VIDEOS.map((embedUrl, i) => (
            <div key={i} className="portfolio-item">
              <div className="video-wrapper rounded-lg overflow-hidden bg-primary/5 border border-primary/10">
                <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                  <iframe
                    loading="lazy"
                    title={`Gumlet video player ${i + 1}`}
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    referrerPolicy="origin"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
