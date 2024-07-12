import { useAuth } from "@/context/authContext";
import { Product } from "../Products"
import ConfirmDialog from "@/components/common/AlertDialog";
import { Link } from "react-router-dom";
import { isUserDefined } from "@/utils/typeGuards";

type DetailsAsideProps = {
    product: Product
    handleDelete: (id: string) => void
}

const DetailsAside = ({product, handleDelete}: DetailsAsideProps) => {
    const { user } = useAuth();
    return (
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
    )
}

export default DetailsAside