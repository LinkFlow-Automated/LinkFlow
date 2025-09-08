"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Music } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SpotifyCardProps {
  className?: string
  isExpanded?: boolean
  onToggle?: () => void
}

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