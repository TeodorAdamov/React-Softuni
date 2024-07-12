import { useEffect, useState } from "react"
import Gallery from "./Gallery"
import { documentByIdRef } from "@/firebase"
import { getDoc, deleteDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { Product } from "../Products"
import DetailsAside from "./DetailsAside"



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        if (id) {
            try {
                const doc = await getDoc(documentByIdRef(id))
                if (doc.exists()) {
                    const data = doc.data() as Product;
                    const id = doc.id;

                    setProduct({ ...data, id })
                }
            } catch (err) {
                console.log(err);
            }

        }
    }

    const handleDelete = async (id: string) => {
        try {
            const docRef = documentByIdRef(id);
            await deleteDoc(docRef);
            navigate('/products')
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        product && (
            <div className="flex flex-col max-w-[1200px] gap-28 p-2 md:flex-row">
                <div className="flex flex-col justify-center gap-5 max-w-[700px]">
                    <Gallery images={product.images} />
                    <div className="bg-slate-200 md-rounded p-4 rounded-md">
                        <p className="text-slate-800 text-3xl font-bold pb-8">Описание</p>
                        <p className="break-words">{product.description}</p>
                    </div>
                </div>
                <DetailsAside product={product} handleDelete={handleDelete} />
            </div>
        )
    )
}

export default ProductDetails