import LinkCard from "@/components/shared/bio/card/link/link-card";
import { ArtistInfoCard } from "@/components/shared/bio/card/spotify/artist-info-card";
import { NewAlbumCard } from "@/components/shared/bio/card/spotify/new-album-card";
import { NewSongCard } from "@/components/shared/bio/card/spotify/new-song-card";
import HeroSection from "@/components/shared/bio/hero/hero-section";

export default function page() {
  return (
    <div className="flex flex-col gap-12 py-4 w-full">
      <div>
        <HeroSection />
      </div>
      <div className="flex flex-col gap-2">
        <ArtistInfoCard />
        <LinkCard />
        <NewSongCard />
        <NewAlbumCard />
      </div>
    </div>
  );
}
