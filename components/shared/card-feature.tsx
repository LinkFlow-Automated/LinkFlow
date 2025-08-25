import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CardFeature({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 rounded-2xl">
        <Image src={image} alt={title} width={1000} height={1000} className="w-full h-full object-cover rounded-2xl" />
      </CardContent>
    </Card>
  );
}
