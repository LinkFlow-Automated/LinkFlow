"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SpotifyCardProps {
  className?: string
  isExpanded?: boolean
  onToggle?: () => void
}

export function ArtistInfoCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 320 : 345,
        height: isExpanded ? 320 : 120,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="max-w-full"
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