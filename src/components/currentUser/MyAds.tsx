import { useAuth } from "@/context/authContext"
import ProductCard from "../products/ProductCard"
import { useEffect, useState } from "react";
import { Product } from "../products/Products";
import { getDocs } from "firebase/firestore";
import { specificItemsByEmail } from "@/firebase";

const MyAds = () => {
    const { user } = useAuth();
    const [myProducts, setMyProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        try {
            const email = user?.email
            if (!email) {
                return
            }
            const q = specificItemsByEmail(email);
            const querySnapshot = await getDocs(q);

            const productsList: Product[] = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data()
                return { ...data, id } as Product
            });
            setMyProducts(productsList);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="flex flex-col">
            {myProducts.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {myProducts.map(p => <ProductCard
                        key={p.id}
                        id={p.id}
                        image={p.images[0]}
                        product={p.product}
                        price={p.price}
                    />)}
                </div>
                :
                <p>Нямате създадена обява.</p>
            }

        </div>
    )
}

export default MyAds