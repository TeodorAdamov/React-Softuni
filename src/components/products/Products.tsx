import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Aside from "./Aside"
import { getDocs } from "firebase/firestore"
import { getAllItemsFromCollection } from "@/firebase"
import CardPagination from "../common/CardPagination"

interface Product {
    id: string;
    images: string[];
    product: string;
    price: string;
    category: string;
    displayName: string;
    phoneNumber: string;
    description: string;
    email: string;
}

const Products = () => {
    const productsPerPage = 12
    const [products, setProducts] = useState<Product[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(productsPerPage)

    async function fetchProducts() {
        try {
            const querySnapshot = await getDocs(getAllItemsFromCollection('products'));

            const productsList: Product[] = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data()
                return { ...data, id } as Product
            });
            setProducts(productsList);

        } catch (err) {
            console.log(err);
        }
    }

    const startIndexHandler = (i: number) => {
        setStartIndex(i)
    }

    const endIndexHandler = (i: number) => {
        setEndIndex(i)
    }

    useEffect(() => {
        fetchProducts();
    }, [])


    return (
        <div className="flex flex-col justify-end p-2 w-full xl:px-44 xl:gap-10 xl:flex-row xl:items-start flex-wrap">
            <aside className="max-w-72 w-full p-4 flex-1">
                <p className="text-center">Избери категория</p>
            </aside>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {products.slice(startIndex, endIndex).map((p) => <ProductCard
                    key={p.id}
                    image={p.images[0]}
                    product={p.product}
                    price={p.price}
                />)}
            </div>
            <div>
                <CardPagination
                    startIndex={startIndex}
                    endIndex={endIndex}
                    startIndexHandler={startIndexHandler}
                    endIndexHandler={endIndexHandler}
                    productsPerPage={productsPerPage}
                    productsLength={products.length} />
            </div>
        </div>
    )
}

export default Products