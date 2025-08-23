import { Button } from "../ui/button";
import CardFeature from "./card-feature";
import Container from "./container";
import { Description, HeroTitle, TypographyContainer } from "./typograghy";

export default function Features() {
  const featuresTop = [
    {
      title: "Feature 1",
      description: "Feature 1 description",
      image: "/test/2.png",
    },
    {
      title: "Feature 2",
      description: "Feature 2 description",
      image: "/test/2.jpg",
    },
  ];

  const featuresBottom = [
    {
      title: "Feature 3",
      description: "Feature 3 description",
      image: "/test/3.png",
    },
    {
      title: "Feature 4",
      description: "Feature 4 description",
      image: "/test/4.png",
    },
    {
      title: "Feature 5",
      description: "Feature 5 description",
      image: "/test/1.jpg",
    },
  ];
  return (
    <div className="min-h-screen bg-primary py-8">
      <Container className="h-full flex flex-col justify-around gap-4 items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <TypographyContainer spacing="loose">
            <HeroTitle className="text-secondary">
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
          <div className="h-1-2 grid grid-cols-2 gap-4">
            {featuresTop.map((feature) => (
              <CardFeature key={feature.title} {...feature} />
            ))}
          </div>
          <div className="h-1-2 grid grid-cols-3 gap-4">
            {featuresBottom.map((feature) => (
              <CardFeature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
        <div>
          <Button
            size="lg"
            className="text-xl px-8 py-6 rounded-2xl bg-secondary text-primary"
          >
            Get Started - For Free
          </Button>
        </div>
      </Container>
    </div>
  );
}
