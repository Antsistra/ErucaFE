import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Promo = () => {
  const images = [
    "https://ucarecdn.com/4950eed1-8118-4b74-8308-e59d47646705/banner12x1.png",
    "https://ucarecdn.com/eef5173c-6ed3-44bb-9c62-5bb00759a5c2/banner32x1.png",
    "https://ucarecdn.com/13b45f59-b4a8-4a26-97e9-7db1f69399ac/bannr22x1.png",
  ];

  return (
    <>
      <Carousel
        className="w-full max-w-4xl"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="w-full h-full">
                  <CardContent className="flex items-center justify-center p-0">
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt={`Promo image ${index + 1}`}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="lg:block hidden" />
        <CarouselNext className="lg:block hidden" />
      </Carousel>
    </>
  );
};

export default Promo;
