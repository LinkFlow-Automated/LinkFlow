import Container from "./container";
import TestimonialsCard from "./testimonials-card";
import { HeroTitle, TypographyContainer } from "./typograghy";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      img: "/test/1.jpg",
      description: "Intagram Influencer",
    },
    {
      id: 2,
      name: "Jane Doe",
      img: "/test/2.png",
      description: "Twitter Influencer",
    },
    {
      id: 3,
      name: "Bob Smith",
      img: "/test/3.png",
      description: "Facebook Influencer",
    },
    {
      id: 4,
      name: "Alice Johnson",
      img: "/test/4.png",
      description: "Instagram Influencer",
    },
  ];

  return (
    <Container id="creator" className="py-12 gap-16 flex flex-col min-h-screen">
      <TypographyContainer spacing="loose" className="sm:max-w-full sm:w-full px-0 md:px-4">
        <HeroTitle className="text-3xl xl:text-8xl sm:max-w-full">
          Trusted by <br /> Creators and Influencers
        </HeroTitle>
      </TypographyContainer>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialsCard
            className={`${
              testimonial.id % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } ${testimonial.id % 2 === 0 ? "md:order-1" : "md:order-2"}`}
            key={testimonial.id}
            {...testimonial}
          />
        ))}
      </div>
    </Container>
  );
}
