import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Aside from "./Aside"
import { getDocs } from "firebase/firestore"
import { getAllItemsFromCollection } from "@/firebase"
import CardPagination from "../common/CardPagination"
import { useLocation, useNavigate, } from "react-router-dom"

export interface Product {
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
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const productsPerPage = 12;
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page') || '1', 10);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(getAllItemsFromCollection('products'));

            const productsList: Product[] = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data()
                return { ...data, id } as Product
            });
            setProducts(productsList);
            setFilteredProducts(productsList)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        query.set('page', currentPage.toString());
        navigate(`?${query.toString()}`, { replace: true })
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredProducts])

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage)));
    }

    const filteredProductsHandler = (products: Product[]) => {
        setFilteredProducts(products)
    }

    return (
        <div className="flex flex-col p-2 w-full items-center sm:items-center md:items-center xl:items-start md:px-44 xl:flex-row 2xl:max-w-[2000px]">
            <Aside products={products} filteredProductsHandler={filteredProductsHandler} />

            <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {filteredProducts.slice(startIndex, endIndex).map((p) => <ProductCard
                        key={p.id}
                        id={p.id}
                        image={p.images[0]}
                        product={p.product}
                        price={p.price}
                    />)}
                </div>
                <div className="flex self-end p-1">
                    <CardPagination
                        startIndex={startIndex}
                        endIndex={endIndex}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        productsLength={filteredProducts.length} />
                </div>
            </div>
        </div>
    )
}

export default Products