import NewPostCard from "@/components/shared/bio/card/intagram/new-post";
import ProfileInstaCard from "@/components/shared/bio/card/intagram/profile-card";
import LinkCard from "@/components/shared/bio/card/link/link-card";
import SingleProductCard from "@/components/shared/bio/card/product/single-product-card";
import { ArtistInfoCard } from "@/components/shared/bio/card/spotify/artist-info-card";
import { CurrentlyPlayingCard } from "@/components/shared/bio/card/spotify/currently-playing-card";
import { NewAlbumCard } from "@/components/shared/bio/card/spotify/new-album-card";
import { NewSongCard } from "@/components/shared/bio/card/spotify/new-song-card";
import NewVideoCard from "@/components/shared/bio/card/youtube/new-video-card";
import HeroSection from "@/components/shared/bio/hero/hero-section";

export default function page() {
  return (
    <div className="flex flex-col gap-8 w-full pb-8">
      <div>
        <HeroSection />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <ArtistInfoCard isExpanded artistImage="/test/aurora1.jpg" artistName="Aurora" />
        {/* <LinkCard /> */}
        <NewSongCard
          songName="The Seed"
          artistName="Aurora"
          artistImage="/test/aurora.jpg"
          isNewRelease
        />
        <NewAlbumCard artistImage="/test/heart.jpg" artistName="Aurora" albumName="Aurora 123" trackCount={10} duration="100" />
        <CurrentlyPlayingCard artistImage="/test/aurora.jpg" isExpanded />
        <NewPostCard user={{ avatar: "/test/heart.jpg", name: "Aurora", }} postUrl="/test/heart.jpg" />
        <ProfileInstaCard user={{ avatar: "/test/heart.jpg", name: "Aurora" }} />
        <SingleProductCard />
        <NewVideoCard />
      </div>
    </div>
  );
}
