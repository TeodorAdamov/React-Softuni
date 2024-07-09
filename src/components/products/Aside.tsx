import { Checkbox } from "@/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { DEFAULT_CATEGORIES } from "../../constants/asideCategoryDefaults";
import { Product } from "./Products";

type categoryType = {
    label: string,
    checked: CheckedState
}

type AsideProps = {
    products: Product[]
    filteredProductsHandler: (products: Product[]) => void
}

const Aside = ({ products, filteredProductsHandler }: AsideProps) => {

    const [chosenCategories, setChosenCategories] = useState<categoryType[]>(DEFAULT_CATEGORIES);

    const onChange = (value: CheckedState, label: string) => {
        setChosenCategories((oldCategories) =>
            oldCategories.map((category) =>
                category.label === label ? { ...category, checked: value } : category
            )
        );
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            chosenCategories.some((category) =>
                category.checked && category.label === product.category
            )
        );
        if (filteredProducts.length > 0 || chosenCategories.some(c => c.checked === true)) {
            filteredProductsHandler(filteredProducts)
        } else {
            filteredProductsHandler(products);
        }
    }, [chosenCategories])





    return (
        <aside className="max-w-56 w-full xl:mr-10 bg-slate-200 rounded-md p-4" >
            <h4 className="text-center pb-10">Избери категория</h4>
            <div className="flex flex-col gap-2">
                {DEFAULT_CATEGORIES.map(category => (
                    <div key={category.label} className="flex flex-row items-center gap-3 justify-between px-2">
                        <label htmlFor={category.label}>{category.label}</label>
                        <Checkbox id={category.label} onCheckedChange={(value) => onChange(value, category.label)} />
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default Aside




