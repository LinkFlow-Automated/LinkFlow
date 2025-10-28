import React from "react";
import { motion } from "framer-motion";
import { getCardStyle } from "@/lib/utils";
// import NewSongCard from "./bio/card/spotify/new-song-card";
import { IconType } from "react-icons/lib";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { NewSongCard } from "./bio/card/spotify/new-song-card";

interface ProviderConnectContentProps {
  name: string;
  color: string;
  icon: IconType;
  description: string;
  cards: {
    id: number;
    title: string;
    background: string;
    image: string;
  }[];
}

export default function ConnectProviderPrompt({
  config,
}: {
  config: ProviderConnectContentProps;
}) {
  return (
    <div className="p-0 space-y-6 relative">
      <div className="z-10 absolute left-0 top-0 text-start space-y-2 p-6 bg-gradient-to-b from-background from-[70%] to-transparent">
        <DialogTitle className="text-2xl font-bold text-foreground text-balance">
          Connect Your{" "}
          <span
            style={{ color: config.color }}
            className="inline-flex items-center gap-2"
          >
            <config.icon className="text-2xl" />
            {config.name}
          </span>
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-pretty leading-relaxed">
          {config.description}
        </DialogDescription>
      </div>

      {/* Animated Radial Layout */}
      <div className="relative flex items-center justify-center h-full overflow-hidden">
        <motion.div
          className="relative w-[500px] h-[500px] left-[-90%]"
          animate={{ rotate: -360 }}
          transition={{ ease: "linear", duration: 100, repeat: Infinity }}
        >
          <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full shadow-inner" />
          {config.cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="absolute w-3/6"
              style={getCardStyle(index, config.cards.length)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewSongCard
                songName={card.title}
                artistName="Aurora"
                artistImage="/test/3.png"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
