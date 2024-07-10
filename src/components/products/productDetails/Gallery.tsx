import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/ui/carousel"

type GalleryProps = {
    images: string[]
}

const Gallery = ({ images }: GalleryProps) => {
    return (
        <Carousel className="w-full max-w-[700px]">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-6 flex items-center justify-center bg-slate-200 rounded-md">
                            <img src={image} alt="" className="aspect-square"/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default Gallery