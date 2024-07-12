import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { addDoc, collection, } from "firebase/firestore"
import { firestore, storageRef } from "../../firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/ui/button"
import { FormLabel } from "@/ui/form"

import { useAuth } from "@/context/authContext"
import { isUserDefined } from "@/utils/typeGuards"
import FormInput from "../common/FormInput"
import FormSelect from "./FormSelect"
import ImageUpload from "./ImageUpload"
import FormTextarea from "./FormTextarea"
import FormContacts from "./FormContacts"
import Loader from "../common/Loader"
import generateRandomString from "@/utils/randomStringGenerator"


const formSchema = z.object({
    product: z.string().trim().min(1, { message: 'Моля въведете име на обявата.' }).max(70, { message: 'Заглавието на обявата трябва да е под 70 символа' }),
    category: z.string().trim().min(1, { message: 'Моля изберете категория.' }),
    description: z.string().trim().min(10, { message: 'Описанието трябва да бъде минимум 10 символа.' }),
    phoneNumber: z.string().trim().min(1, { message: 'Моля въведете телефон за контакт.' }),
    email: z.string().trim().email({ message: 'Моля въведете имейл адрес.' }),
    displayName: z.string().trim().min(1, { message: 'Моля въведете вашето име.' }),
    price: z.string().trim().min(1, { message: 'Моля въведете цена' }).transform((val, ctx) => {
        if (isNaN(Number(val))) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Моля въведете число'
            })
        }
        return val;
    })
})

const SellForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const [images, setImages] = useState<File[]>([])
    const { user } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: '',
            category: '',
            description: '',
            phoneNumber: '',
            price: '',
            email: isUserDefined(user) ? user.email! : '',
            displayName: isUserDefined(user) ? user.displayName! : ''
        }
    });

    const imageHandler = (img: File[]) => {
        setImages(img)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        Promise.all(images.map(image => uploadBytes(storageRef(generateRandomString(25)), image)))
            .then(snapshot => {
                Promise.all(snapshot.map(s => getDownloadURL(s.ref)))
                    .then(async (images) => {
                        await addDoc(collection(firestore, 'products'), { ...values, images })
                        setLoading(false);
                        navigate('/products');
                    })
            }).catch(error => {
                console.log(error);
                navigate('/login');
            })
    }

    return (
        loading ? (
            <Loader loading={loading} color='#1e293b' override={{}} />
        )
            :
            (
                <div className="w-full flex flex-col items-center" >
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-initial w-full max-w-[1000px] p-4 gap-6  text-slate-800">
                            <FormLabel className=" text-slate-800 text-2xl">Какво продаваш</FormLabel>
                            <div className="flex flex-col gap-6 bg-slate-200 p-4 rounded-md shadow-inner">
                                <FormInput name='product' type='text' placeholder='Име на обявата' className='bg-white' />
                                <FormSelect name='category' placeholder='Избери категория' />
                            </div>
                            <ImageUpload imageHandler={imageHandler} />
                            <FormTextarea name='description' />
                            <div className=' bg-slate-200 p-4 shadow-inner'>
                                <p className='text-center pb-4 text-slate-800 text-2xl'>Цена</p>
                                <FormInput name='price' type='text' placeholder='Цена' className='bg-white max-w-[500px]' />
                            </div>
                            <FormContacts />
                            <Button type='submit'>Добави обява</Button>
                        </form>
                    </FormProvider>
                </div>
            )
    )
}

export default SellForm