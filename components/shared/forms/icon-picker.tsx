"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import * as Icons from "react-icons/ri"

interface IconPickerProps {
  onIconSelect: (iconName: string) => void
  selectedIcon?: string
}

export default function IconPicker({ onIconSelect, selectedIcon }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const popularIcons = [
    "RiHomeLine",
    "RiUserLine",
    "RiSettings4Line",
    "RiMailLine",
    "RiPhoneLine",
    "RiMapPinLine",
    "RiCalendarLine",
    "RiTimeLine",
    "RiHeartLine",
    "RiStarLine",
    "RiThumbUpLine",
    "RiShareLine",
    "RiDownloadLine",
    "RiUploadLine",
    "RiEditLine",
    "RiDeleteBinLine",
    "RiSearchLine",
    "RiFilterLine",
    "RiMoreLine",
    "RiAddLine",
    "RiSubtractLine",
    "RiCloseLine",
    "RiCheckLine",
    "RiArrowRightLine",
    "RiArrowLeftLine",
    "RiArrowUpLine",
    "RiArrowDownLine",
    "RiExternalLinkLine",
    "RiLinkM",
    "RiImageLine",
    "RiVideoLine",
    "RiMusicLine",
    "RiFileLine",
    "RiFolderLine",
    "RiDatabaseLine",
    "RiCloudLine",
  ]

  const filteredIcons = popularIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <ScrollArea className="h-48 w-full border rounded-md p-2">
        <div className="grid grid-cols-6 gap-2">
          {filteredIcons.map((iconName) => {
            const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]

            if (!IconComponent) {
              return null
            }

            return (
              <Button
                key={iconName}
                variant="ghost"
                size="sm"
                className={cn("h-10 w-10 p-0", selectedIcon === iconName && "bg-primary text-primary-foreground")}
                onClick={() => onIconSelect(iconName)}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
            )
          })}
        </div>
      </ScrollArea>

      {selectedIcon && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Selected:</span>
          <code className="bg-muted px-2 py-1 rounded text-xs">{selectedIcon}</code>
        </div>
      )}
    </div>
  )
}
