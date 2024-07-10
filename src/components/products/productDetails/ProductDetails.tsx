import { useEffect, useState } from "react"
import Gallery from "./Gallery"
import { documentByIdRef } from "@/firebase"
import { getDoc, deleteDoc } from "firebase/firestore"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Product } from "../Products"
import { useAuth } from "@/context/authContext"
import { isUserDefined } from "@/utils/typeGuards"
import ConfirmDialog from "@/components/common/AlertDialog"



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { user } = useAuth();
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
                <aside className="rounded-md flex-1 flex flex-col gap-5">
                    <div className="flex flex-col gap-5 bg-slate-200 p-4 rounded-md">
                        <h4 className="">{product.product}</h4>
                        <p className="text-2xl text-slate-800 font-bold">{product.price} лв.</p>
                        <button className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-2xl">СЪОБЩЕНИЕ</button>
                    </div>
                    <div className="flex flex-col gap-6 p-4 bg-slate-200 rounded-md">
                        <p className="text-base">Потребител</p>
                        <p className="text-2xl text-slate-800">{product.displayName}</p>
                        <button className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-xl">Всички обяви от този потребител</button>
                    </div>
                    {isUserDefined(user) && user.email === product.email &&
                        <div className="flex flex-col gap-6 p-4 bg-slate-200 rounded-md">
                            <Link to={`/edit/${product.id}`} className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-xl text-center">Редактирай</Link>
                            <ConfirmDialog handleDelete={handleDelete} id={product.id} />
                        </div>
                    }
                </aside>
            </div>
        )
    )
}

export default ProductDetails