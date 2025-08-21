import { be } from "date-fns/locale";
import TestimonialsCard from "./testimonials-card";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      img: "/testimonials/john-doe.jpg",
      description: "Intagram Influencer",
    },
    {
      id: 2,
      name: "Jane Doe",
      img: "/testimonials/jane-doe.jpg",
      description: "Twitter Influencer",
    },
    {
      id: 3,
      name: "Bob Smith",
      img: "/testimonials/bob-smith.jpg",
      description: "Facebook Influencer",
    },
    {
      id: 4,
      name: "Alice Johnson",
      img: "/testimonials/alice-johnson.jpg",
      description: "Instagram Influencer",
    },
  ];

  return (
    <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold text-center">
        Trusted by Creators and Influencers
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialsCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
