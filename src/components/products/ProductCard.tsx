import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import { Link } from "react-router-dom"
type ProductCardPropsType = {
    image: string,
    product: string,
    price: string,
    id: string,
}

const ProductCard = ({ image, product, price, id }: ProductCardPropsType) => {
    return (
        <Link to={id} >
            <Card className="max-w-[300px] max-h-96 h-full flex flex-col gap-4">
                <CardHeader>
                    <img src={image} alt="" className="w-[350px] max-h-60 rounded-t-sm aspect-square" />
                </CardHeader>
                <CardContent className="">
                    <CardTitle className="text-black text-base break-words">{product}</CardTitle>
                    <p className="font-bold text-xl text-slate-800 pt-4">{price} лв.</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ProductCard