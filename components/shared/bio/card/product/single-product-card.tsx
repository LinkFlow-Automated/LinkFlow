"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { useImageColor } from "@/hooks/use-image-color";
import Image from "next/image"

export default function SingleProductCard({
  provider,
  subType,
  data,
}: {
  provider?: string;
  subType?: string;
  data?: any;
}) {
  const product = {
    name: data?.name || "Air Jordan",
    description: data?.price ? `${data?.currency || "$"}${(data.price / 100).toFixed(2)}` : "$100",
    image: data?.preview_url || "/test/heart.jpg",
    url: data?.short_url || "#",
  };

  const { backgroundColor, textColor, imgRef } = useImageColor(product.image);

  return (
    <Card className="p-2 m-0 gap-4 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(product.url, '_blank')}>
      <CardContent className="m-0 p-0 rounded-xl max-h-48 overflow-hidden flex items-center justify-center">
        <Image className="w-full h-full object-cover rounded-xl" src={product.image} width={1000} height={1000} alt={`image of ${product.name}`} />
      </CardContent>
      <CardFooter className="m-0 pt-3 p-1 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <CardDescription className="text-sm font-medium">{product.description}</CardDescription>
        </div>
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">
          Get
        </div>
      </CardFooter>
    </Card>
  );
}

