import { Button } from "../ui/button";
import Container from "./container";
import {
  AccentText,
  Description,
  HeroTitle,
  TypographyContainer,
} from "./typograghy";

export default function Hero() {
  return (
    <Container className="h-screen pt-20 md:pt-32 flex flex-col justify-center items-center relative">
      <div className="h-4/5 w-full select-none">
        <TypographyContainer
          spacing="loose"
          className="sm:max-w-full sm:w-full"
        >
          <HeroTitle className="text-3xl xl:text-8xl">
            OPTIMIZE LINK TITLES
            <br />
            <AccentText className="text-primary/75">
              AND DESCRIPTIONS
            </AccentText>
            <br />
            <AccentText color="primary">AUTOMATICALLY.</AccentText>
          </HeroTitle>
        </TypographyContainer>
      </div>
      <div className="h-1/5 flex md:flex-row flex-col md:justify-around w-full sm:gap-4">
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start text-center md:text-start">
          <Description size="md" className="mt-3 max-w-md">
            AI-powered keywords all meta descriptions to enhance discoverability
            on search engines.
          </Description>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
          <Button
            size={"lg"}
            className="md:text-xl md:px-8 md:py-6 rounded-2xl"
          >
            Get Started - For Free
          </Button>
        </div>
      </div>
    </Container>
  );
}
