import Container from "./container";
import { Description, HeroTitle, TypographyContainer } from "./typograghy";

export default function award() {
  return (
    <div>
      <Container>
        <div>
          <TypographyContainer>
            <HeroTitle>
              Our Platform <br /> Got several Awards
            </HeroTitle>
          </TypographyContainer>
        </div>
        <div></div>
        <div>
          <Description>
            Breezi is an eligible product if it is launched on ProductHunt,
            HackerNews, and other similar platforms.
          </Description>
        </div>
      </Container>
    </div>
  );
}
