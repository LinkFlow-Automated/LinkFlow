"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Users, Music, Calendar, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SpotifyCardProps {
  className?: string
  isExpanded?: boolean
  onToggle?: () => void
}

// Artist Info Card
export function ArtistInfoCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 320 : 320,
        height: isExpanded ? 320 : 120,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "bg-card border-border h-full w-full",
          className,
        )}
        onClick={onToggle}
      >
        <div className="p-3 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Music className="w-8 h-8 text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">The Weeknd</h3>
                    <p className="text-sm text-muted-foreground">Artist</p>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-card-foreground">Followers</span>
                    </div>
                    <p className="text-lg font-bold text-primary">12.4M</p>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-card-foreground">Monthly</span>
                    </div>
                    <p className="text-lg font-bold text-primary">89.2M</p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Top Artist
                  </Badge>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-primary">The Weeknd</h3>
                    <p className="text-sm text-muted-foreground">12.4M followers</p>
                  </div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                    <Badge variant="default" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      New
                    </Badge>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center gap-3 mt-auto"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                    <Music className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">Blinding Lights</p>
                    <p className="text-xs text-muted-foreground">89.2M monthly listeners</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

// New Song Card
export function NewSongCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 320 : 320,
        height: isExpanded ? 320 : 120,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "bg-card border-border h-full w-full",
          className,
        )}
        onClick={onToggle}
      >
        <div className="p-3 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-lg bg-gradient-to-br from-accent/30 to-accent/60 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Music className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-2">
                        New Release
                      </Badge>
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary">Save Your Tears</h3>
                    <p className="text-sm text-muted-foreground">The Weeknd</p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {[
                    { label: "Released", value: "2 days ago" },
                    { label: "Streams", value: "2.1M" },
                    { label: "Duration", value: "3:35" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between text-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-card-foreground font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="mt-auto"
                >
                  <motion.button
                    className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsPlaying(!isPlaying)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 0.3 }}>
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    </motion.div>
                    {isPlaying ? "Pause" : "Play"}
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      New Song
                    </Badge>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Calendar className="w-3 h-3" />
                    2d ago
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center gap-3 mt-auto"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-accent/60 flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">Save Your Tears</p>
                    <p className="text-xs text-muted-foreground">2.1M streams • 3:35</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-accent hover:text-accent hover:bg-accent/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPlaying(!isPlaying)
                      }}
                    >
                      <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 0.3 }}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

// New Album Card
export function NewAlbumCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 320 : 320,
        height: isExpanded ? 320 : 120,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "bg-card border-border h-full w-full",
          className,
        )}
        onClick={onToggle}
      >
        <div className="p-3 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Music className="w-10 h-10 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-2">
                        New Album
                      </Badge>
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary">After Hours</h3>
                    <p className="text-sm text-muted-foreground">The Weeknd</p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {[
                    { label: "Tracks", value: "14 songs" },
                    { label: "Duration", value: "56 min" },
                    { label: "Released", value: "1 week ago" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between text-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-card-foreground font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="space-y-2 mt-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <p className="text-xs text-muted-foreground">Popular tracks:</p>
                  <div className="space-y-1">
                    {["Blinding Lights", "Save Your Tears", "In Your Eyes"].map((track, index) => (
                      <motion.p
                        key={track}
                        className="text-sm text-card-foreground"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        • {track}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      New Album
                    </Badge>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Calendar className="w-3 h-3" />
                    1w ago
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center gap-3 mt-auto"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">After Hours</p>
                    <p className="text-xs text-muted-foreground">14 tracks • 56 min</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

// Currently Playing Card
export function CurrentlyPlayingCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(65)

  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 320 : 320,
        height: isExpanded ? 320 : 120,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "bg-card border-border relative overflow-hidden h-full w-full",
          className,
        )}
        onClick={onToggle}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"
          animate={{
            opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
            x: isPlaying ? [0, 100, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />

        <div className="relative p-3 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center justify-between mb-4"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div
                    animate={{
                      scale: isPlaying ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Badge variant="secondary" className="bg-accent text-white border-accent/30">
                      Now Playing
                    </Badge>
                  </motion.div>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-accent"
                    animate={{
                      scale: isPlaying ? [1, 1.5, 1] : 1,
                      opacity: isPlaying ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-lg bg-gradient-to-br from-accent/40 to-accent/70 flex items-center justify-center"
                    animate={{
                      rotate: isPlaying ? 360 : 0,
                      scale: isPlaying ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
                      scale: { duration: 2, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" },
                    }}
                  >
                    <Music className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">Blinding Lights</h3>
                    <p className="text-sm text-muted-foreground">The Weeknd</p>
                    <p className="text-xs text-muted-foreground mt-1">After Hours • 2020</p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>2:10</span>
                    <span>3:20</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <motion.div
                      className="bg-accent h-1 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-4 mt-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full w-12 h-12"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPlaying(!isPlaying)
                      }}
                    >
                      <motion.div animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center justify-between mb-3"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.div
                    animate={{
                      scale: isPlaying ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Badge variant="secondary" className="bg-accent text-white border-accent/30 text-xs">
                      Now Playing
                    </Badge>
                  </motion.div>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-accent"
                    animate={{
                      scale: isPlaying ? [1, 1.5, 1] : 1,
                      opacity: isPlaying ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 mb-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/40 to-accent/70 flex items-center justify-center"
                    animate={{
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{
                      duration: 6,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "linear",
                    }}
                  >
                    <Music className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">Blinding Lights</p>
                    <p className="text-xs text-muted-foreground">The Weeknd • 2:10 / 3:20</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-accent hover:text-accent hover:bg-accent/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPlaying(!isPlaying)
                      }}
                    >
                      <motion.div animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="w-full bg-muted rounded-full h-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <motion.div
                    className="bg-accent h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}
