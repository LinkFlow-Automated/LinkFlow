import LinkCard from "@/components/shared/bio/card/link/link-card";
import { ArtistInfoCard } from "@/components/shared/bio/card/spotify/artist-info-card";
import { CurrentlyPlayingCard } from "@/components/shared/bio/card/spotify/currently-playing-card";
import { NewAlbumCard } from "@/components/shared/bio/card/spotify/new-album-card";
import { NewSongCard } from "@/components/shared/bio/card/spotify/new-song-card";
import HeroSection from "@/components/shared/bio/hero/hero-section";

export default function page() {
  return (
    <div className="flex flex-col gap-8 w-full pb-8">
      <div>
        <HeroSection />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <ArtistInfoCard />
        <LinkCard />
        <NewSongCard
          songName="Counting Star"
          artistImage="/test/2.png"
          isNewRelease
        />
        <NewAlbumCard artistImage="/test/3.png" isNewRelease />
        <CurrentlyPlayingCard />
      </div>
    </div>
  );
}
