import { Button } from "../ui/button";
import Container from "./container";
import CountdownTimer from "./countdown-timer";
import { Description, HeroTitle, TypographyContainer } from "./typograghy";

export default function FooterCta() {
  return (
    <Container className="h-fit gap-6">
      <div className="w-full py-12">
        <TypographyContainer align="left" className="text-start p-0 m-0 w-full">
          <HeroTitle className="text-start xl:text-[10rem] max-w-full">
            Black Friday <br /> Discount
          </HeroTitle>
        </TypographyContainer>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <div>
              <Description className="max-w-sm">
                Get your LIFETIME PRO <br /> Bio Link only for
              </Description>
            </div>
            <div>
              <Description className="xl:text-6xl xl:font-black">
                $99
              </Description>
            </div>
          </div>
          <Button size={"lg"} className="bg-primary">
            Get Stated - For Free
          </Button>
        </div>
        {/* timer for launching */}
        <div>
          <CountdownTimer />
        </div>
      </div>
    </Container>
  );
}
