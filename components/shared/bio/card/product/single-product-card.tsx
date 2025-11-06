"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { useImageColor } from "@/hooks/use-image-color";
import Image from "next/image"

export default function SingleProductCard() {
  const product = {
    name: "Air Jordan",
    description: "$100",
    image: "/test/heart.jpg"
  }

  const { backgroundColor, textColor, imgRef } = useImageColor(product.image);

  const layoutConfig = {
    compact: {
      padding: "p-2",
      imageSize: "h-12 w-12",
      imageSizeNum: 48,
      titleSize: "text-sm",
      subtitleSize: "text-xs",
      iconSize: "size-5",
      gap: "gap-2",
      showBadge: false,
      showDetails: false,
    },
    minimal: {
      padding: "p-3",
      imageSize: "h-18 w-18",
      imageSizeNum: 64,
      titleSize: "text-base",
      subtitleSize: "text-sm",
      iconSize: "size-6",
      gap: "gap-3",
      showBadge: true,
      showDetails: false,
    },
    detailed: {
      padding: "p-4",
      imageSize: "h-20 w-20",
      imageSizeNum: 80,
      titleSize: "text-lg",
      subtitleSize: "text-base",
      iconSize: "size-8",
      gap: "gap-4",
      showBadge: true,
      showDetails: true,
    },
  };

  // const config = layoutConfig[layout];

  return (
    <Card className="p-2 m-0 gap-4">
      <CardContent className="m-0 p-0 rounded-xl">
        <Image className="w-full h-full object-cover rounded-xl" src={product.image} width={1000} height={1000} alt={`image of ${product.name}`} />
      </CardContent>
      <CardFooter className="m-0 p-0 flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </div>
        <div className="">
          click
        </div>
      </CardFooter>
    </Card>
  )
}

