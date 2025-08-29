import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UAParser } from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);

  const deviceType = parser.getDevice().type || "desktop";
  const os = parser.getOS().name;
  const browser = parser.getBrowser().name;

  return {
    device: deviceType,
    os,
    browser,
  };
}

export function periodToDateRange(
  period: string
  // timezone = "UTC"
): { from: Date; to: Date } {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  switch (period) {
    case "today":
      return {
        from: startOfToday,
        to: now,
      };
    case "yesterday": {
      const yesterday = new Date(startOfToday);
      yesterday.setDate(yesterday.getDate() - 1);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setDate(endOfYesterday.getDate() + 1);
      return {
        from: yesterday,
        to: endOfYesterday,
      };
    }
    case "last7days": {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return {
        from: sevenDaysAgo,
        to: now,
      };
    }
    case "last30days": {
      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return {
        from: thirtyDaysAgo,
        to: now,
      };
    }
    case "last90days": {
      const ninetyDaysAgo = new Date(startOfToday);
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return {
        from: ninetyDaysAgo,
        to: now,
      };
    }
    case "thisMonth":
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: now,
      };
    case "lastMonth": {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        from: lastMonth,
        to: endOfLastMonth,
      };
    }
    case "thisYear":
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to: now,
      };
    case "lastYear": {
      const lastYear = new Date(now.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);
      return {
        from: lastYear,
        to: endOfLastYear,
      };
    }
    default: {
      // Default to last 30 days
      const defaultStart = new Date(startOfToday);
      defaultStart.setDate(defaultStart.getDate() - 30);
      return {
        from: defaultStart,
        to: now,
      };
    }
  }
}

export const getStripeLink = (url: string, data: string) => {
  return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${url}&state=${data}`;
};
