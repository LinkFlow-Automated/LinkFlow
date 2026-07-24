"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TooltipWrapper from "../tooltip-wrapper";
import { IoAddCircle } from "react-icons/io5";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  SOCIAL_PLATFORMS,
  socialPlatform,
  socialPrefixLabel,
  buildSocialUrl,
  extractSocialHandle,
  parseSocialLinks,
  type SocialLink,
} from "@/lib/social-platforms";
import { updateProfileSocials } from "@/lib/actions/user-actions";
import { usePreviewStore } from "@/stores/preview-store";

interface AddSocialIconProps {
  profileId: string;
  socialLinks?: unknown;
}

export default function AddSocialIcon({
  profileId,
  socialLinks,
}: AddSocialIconProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [links, setLinks] = useState<SocialLink[]>(() =>
    parseSocialLinks(socialLinks)
  );
  const [platform, setPlatform] = useState<string>("");
  const [input, setInput] = useState("");

  const selected = platform ? socialPlatform(platform) : undefined;
  const isFullUrl = selected ? selected.baseUrl === "" : false;

  const addLink = () => {
    if (!selected) {
      toast.error("Pick a platform");
      return;
    }
    if (!input.trim()) {
      toast.error(isFullUrl ? "Enter a URL" : "Enter your username");
      return;
    }
    const url = buildSocialUrl(platform, input);
    setLinks((prev) => [
      ...prev.filter((l) => l.platform !== platform),
      { platform, url },
    ]);
    setPlatform("");
    setInput("");
  };

  const removeLink = (value: string) => {
    setLinks((prev) => prev.filter((l) => l.platform !== value));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileSocials(profileId, links);
      // Reflect in the live mini-phone preview immediately.
      usePreviewStore.getState().setSocials(links);
      toast.success("Social links updated");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error saving social links:", error);
      toast.error("Failed to update social links");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Add icon">
        <DialogTrigger className="cursor-pointer" asChild>
          <IoAddCircle className="size-5 text-muted-foreground hover:text-primary cursor-pointer" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <IoAddCircle className="size-5" />
            <DialogTitle>Add Social Icon</DialogTitle>
          </div>
          <DialogDescription>
            Pick a platform and enter your username — we build the link for you.
          </DialogDescription>
        </DialogHeader>

        {/* Existing links */}
        {links.length > 0 && (
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              const p = socialPlatform(link.platform);
              const Icon = p?.icon;
              return (
                <li
                  key={link.platform}
                  className="flex items-center gap-2 rounded-md border p-2"
                >
                  {Icon ? <Icon className="size-4 shrink-0" /> : null}
                  <span className="text-sm font-medium shrink-0">
                    {p?.label ?? link.platform}
                  </span>
                  <span className="text-xs text-muted-foreground truncate flex-1">
                    {extractSocialHandle(link.platform, link.url)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLink(link.platform)}
                    aria-label={`Remove ${p?.label ?? link.platform}`}
                    className="text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Add a new link */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            value={platform}
            onValueChange={(v) => {
              setPlatform(v);
              setInput("");
            }}
          >
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {SOCIAL_PLATFORMS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  <p.icon className="size-4" />
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-1 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring overflow-hidden">
            {selected && !isFullUrl && (
              <span className="pl-2.5 pr-0.5 text-sm text-muted-foreground whitespace-nowrap select-none">
                {socialPrefixLabel(selected)}
              </span>
            )}
            <Input
              placeholder={
                !selected ? "Username" : isFullUrl ? "https://..." : "username"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLink();
                }
              }}
              disabled={!selected}
              className="border-0 focus-visible:ring-0 shadow-none px-1.5"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addLink}
            className="cursor-pointer"
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer"
          >
            {isSaving ? <Loader2 className="animate-spin size-4" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
