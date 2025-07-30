"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
//import { Avatar } from "@/components/ui/avatar";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <Image src="/assets/linkflow-logo-trans.png" alt="LinkFlow Logo" width={32} height={32} className="h-8 w-8" />
          <a href="#hero"><span className="font-bold text-xl tracking-tight">LinkFlow</span></a>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Button variant="ghost">
            <Link href="#features" className="hover:text-primary transition">Features</Link>
          </Button>
          <Button variant="ghost">
            <Link href="#how" className="hover:text-primary transition">How it Works</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open main menu"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) menu.classList.toggle("hidden");
            }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <title>Open menu</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile menu panel */}
          <div
            id="mobile-menu"
            className="absolute right-4 top-16 bg-white border rounded-lg shadow-lg flex flex-col gap-2 p-4 z-40 min-w-[180px]"
          >
            <Link href="#features" className="hover:text-primary transition py-1">Features</Link>
            <Link href="#how" className="hover:text-primary transition py-1">How it Works</Link>
            <Link href="/dashboard" className="hover:text-primary transition py-1">Dashboard</Link>
            <Link href="/signup">
              <Button className="w-full mt-2">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar Ended */}

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">The Smarter Bio <br /> Link for Creators & Brands</h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 text-muted-foreground">
          Organize, automate, and track all your links in one place. Promote your best content, sync socials, and grow your audience with LinkFlow.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Button size="lg" asChild>
          <Link href="/signup">Start for Free</Link>
        </Button>
        <Button size="lg" variant="outline">
          <Link href="/">Github</Link>
        </Button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why LinkFlow?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Image src="/assets/automated.png" alt="Automation" className="h-12 mb-1" width={1000} height={1000} />
            <h3 className="font-semibold text-xl mb-1">Automated Promotions</h3>
            <p className="text-muted-foreground">Set rules to auto-promote your top links based on real-time traffic and engagement.</p>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Image src="/assets/analytics.png" alt="Analytics" className="h-12 mb-1" width={1000} height={1000}/>
            <h3 className="font-semibold text-xl mb-1">Advanced Analytics</h3>
            <p className="text-muted-foreground">Track clicks, spot trends, and optimize your link strategy with smart, actionable insights.</p>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Image src="/assets/sync.png" alt="Content Sync" className="h-12 mb-1" width={1000} height={1000}/>
            <h3 className="font-semibold text-xl mb-1">Content Sync</h3>
            <p className="text-muted-foreground">Auto-pull your latest posts from Instagram, YouTube & more, keeping your bio fresh!</p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Get Set Up in Seconds</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { step: "1", title: "Sign Up & Connect", desc: "Create your free account and link your socials, stores, and content." },
            { step: "2", title: "Customize Your Flow", desc: "Drag, drop, and design your perfect link page" },
            { step: "3", title: "Share & Grow", desc: "Drop your LinkFlow URL everywhere. Track performance and scale smarter." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="bg-primary text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                {item.step}
              </div>
              <h4 className="font-semibold text-xl mb-3">{item.title}</h4>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}





