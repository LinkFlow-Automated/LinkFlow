"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Disc, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SpotifyCardProps {
  className?: string
  isExpanded?: boolean
  onToggle?: () => void
}

export function NewAlbumCard({ className, isExpanded = false, onToggle }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      layout
      animate={{
        width: isExpanded ? 345 : 345,
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
                    <Disc className="w-10 h-10 text-white" />
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
                  className="space-y-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {[
                    { label: "Released", value: "2 days ago" },
                    { label: "Tracks", value: "14" },
                    { label: "Duration", value: "56:23" },
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
                    <Disc className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">After Hours</p>
                    <p className="text-xs text-muted-foreground">14 tracks • 56:23</p>
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