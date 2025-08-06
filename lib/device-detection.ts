export class DeviceDetector {
  static detectDevice(userAgent: string): "mobile" | "desktop" | "tablet" {
    const ua = userAgent.toLowerCase();

    // Tablet detection first (more specific)
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return "tablet";
    }

    // Mobile detection
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        userAgent
      )
    ) {
      return "mobile";
    }

    return "desktop";
  }

  static detectPlatform(referrer?: string): string | undefined {
    if (!referrer) return undefined;

    const domain = new URL(referrer).hostname.toLowerCase();

    const platformMap: { [key: string]: string } = {
      "instagram.com": "instagram",
      "tiktok.com": "tiktok",
      "twitter.com": "twitter",
      "x.com": "twitter",
      "linkedin.com": "linkedin",
      "facebook.com": "facebook",
      "youtube.com": "youtube",
      "pinterest.com": "pinterest",
      "snapchat.com": "snapchat",
    };

    for (const [domain_key, platform] of Object.entries(platformMap)) {
      if (domain.includes(domain_key)) {
        return platform;
      }
    }

    return "direct";
  }
}
