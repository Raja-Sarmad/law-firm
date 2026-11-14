export function AboutVideo() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-[#0c0f14]">
      <div className="relative aspect-video w-full">
        <iframe
          src="https://fast.wistia.net/embed/iframe/3q9zebsftf?videoFoam=true"
          title="The Solo Firm Blueprint"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
