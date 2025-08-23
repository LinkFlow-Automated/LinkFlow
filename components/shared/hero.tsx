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
    <Container className="h-screen pt-32 flex flex-col justify-center items-center relative">
      <div className="h-4/5">
        <TypographyContainer spacing="loose" className="mb-20">
          <HeroTitle className=" xl:text-8xl">
            OPTIMIZE LINK TITLES
            <br />
            <AccentText className="text-primary/75">AND DESCRIPTIONS</AccentText>
            <br />
            <AccentText color="primary">AUTOMATICALLY.</AccentText>
          </HeroTitle>
        </TypographyContainer>
      </div>
      <div className="h-1/5 flex flex-row justify-around w-full">
        <div className="w-1/2 flex items-center justify-start">
          <Description size="md" className="mt-8 max-w-md">
            AI-powered keywords all meta descriptions to enhance discoverability
            on search engines.
          </Description>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <Button size={'lg'} className="text-xl px-8 py-6 rounded-2xl">Get Started - For Free</Button>
        </div>
      </div>
    </Container>
  );
}
