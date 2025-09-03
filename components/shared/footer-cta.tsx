import { Button } from "../ui/button";
import Container from "./container";
import CountdownTimer from "./countdown-timer";
import { Description, HeroTitle, TypographyContainer } from "./typograghy";

export default function FooterCta() {
  return (
    <Container className="h-fit gap-6 py-12 text-secondary select-none">
      <div className="w-full py-12">
        <TypographyContainer align="left" className="text-start p-0 m-0 w-full">
          <HeroTitle className="text-start xl:text-[10rem] max-w-full">
            Black Friday <br /> Discount
          </HeroTitle>
        </TypographyContainer>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <div>
              <Description className="max-w-sm">
                Get your LIFETIME PRO <br /> Bio Link only for
              </Description>
            </div>
            <div>
              <Description className=" text-5xl xl:text-6xl font-black">
                $99
              </Description>
            </div>
          </div>
          <Button size={"lg"} className=" mt-5 bg-secondary text-primary hover:bg-secondary/60 hover:text-primary">
            Get Stated - For Free
          </Button>
        </div>
        {/* timer for launching */}
        <div className="px-4 md:px-0">
          <CountdownTimer />
        </div>
      </div>
    </Container>
  );
}
