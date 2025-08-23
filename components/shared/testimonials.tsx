import TestimonialsCard from "./testimonials-card";

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
    <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        Trusted by Creators and Influencers
      </h1>
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
    </div>
  );
}
