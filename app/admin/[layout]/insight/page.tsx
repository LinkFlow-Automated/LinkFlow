import { auth } from "@/lib/auth";
import { getLinkStats } from "@/lib/services/link-analitycs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CardStats from "./_components/card-stats";
import CardProduct from "./_components/top-card-product";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  // const linkStat = await getLinkStats(session.user.id);
  return (
    <div className="pt-8 flex flex-col gap-8 md:px-4 h-full">
      {/* Stat card */}
      <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardStats
            key={index}
            title={
              [
                "Total Click",
                "Total Visit",
                "Total Conversion",
                "Total Revenue",
                "Conversion Rate",
              ][index]
            }
            //dummy data
            totalSales={1000}
            chartData={[
              { month: "Jan", desktop: 10 },
              { month: "Feb", desktop: 200 },
              { month: "Mar", desktop: 100 },
              { month: "Apr", desktop: 400 },
              { month: "May", desktop: 350 },
              { month: "Jun", desktop: 600 },
            ]}
            chartConfig={{
              desktop: {
                label: [
                  "Total Click",
                  "Total Visit",
                  "Total Conversion",
                  "Total Revenue",
                ][index],
                color: "var(--chart-1)",
              },
            }}
            pourcentageChange={12.5}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="p-4 bg-secondary/90 rounded-2xl w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-foreground">Most clicked</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <CardProduct
              productName="Product 1"
              postedAt="2023-01-01"
              commissions={100}
              sold={100}
              totalClicks={1000}
            />
          </div>
        </div>
        {/* utm referrer stats */}
        <div className="p-4 bg-secondary/90 rounded-2xl w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-foreground">
            UTM Referrer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <CardProduct
              productName="Product 1"
              postedAt="2023-01-01"
              commissions={100}
              sold={100}
              totalClicks={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
