import { Button } from "../ui/button";
import CardFeature from "./card-feature";
import Container from "./container";
import { Description, HeroTitle, TypographyContainer } from "./typograghy";

export default function Features() {
  const featuresTop = [
    {
      title: "Smart Rules",
      description: "Personalize your links for every visitor. Show different content based on location, language, or device to maximize engagement and conversions.",
      image: "/test/2.png",
    },
    {
      title: "AI Optimization",
      description: "Let AI do the heavy lifting. Breezi analyzes visitor behavior and automatically promotes your best-performing links.",
      image: "/test/2.jpg",
    },
  ];

  const featuresBottom = [
    {
      title: "Instant Editing via Telegram",
      description: "Update on the go. Instantly edit your bio and links directly from Telegram, no need to log in to a dashboard.",
      image: "/test/3.png",
    },
    {
      title: "Built-in Analytics",
      description: "See what really works. Track clicks, geographic reach, devices, browsers, and campaign results in real time.",
      image: "/test/4.png",
    },
    {
      title: "Multi-Channel Ready",
      description: "One link, everywhere. Use your Breezi identity across Facebook, Instagram, TikTok, X, LinkedIn, or even business cards.",
      image: "/test/1.jpg",
    },
  ];
  return (
    <div id="features" className="min-h-screen bg-primary py-8 scroll-mt-16">
      <Container className="h-full flex flex-col justify-around gap-4 items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <TypographyContainer spacing="loose">
            <HeroTitle className="text-secondary text-3xl xl:text-8xl">
              Not Just a Link-in-Bio.
              <br />A full creator platform.
            </HeroTitle>
          </TypographyContainer>
          <Description className="text-center text-secondary">
            Everything you need to build a business in one place, no code or
            design team needed. Do it all from your AI-powered Link-in-Bio.
          </Description>
        </div>
        <div className="h-full flex flex-col justify-around gap-4">
          <div className="h-1-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuresTop.map((feature) => (
              <CardFeature key={feature.title} {...feature} />
            ))}
          </div>
          <div className="h-1-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuresBottom.map((feature) => (
              <CardFeature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
        <div>
          <Button
            size="lg"
            className="md:text-xl md:px-8 md:py-6 mt-2 rounded-2xl bg-secondary text-primary hover:bg-secondary/60 hover:text-primary"
          >
            Get Started - For Free
          </Button>
        </div>
      </Container>
    </div>
  );
}
