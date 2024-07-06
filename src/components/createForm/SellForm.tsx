import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { Button } from "@/ui/button"
import { FormLabel } from "@/ui/form"
import { useState } from "react"


import FormInput from "../common/FormInput"
import FormSelect from "./FormSelect"
import ImageUpload from "./ImageUpload"
import FormTextarea from "./FormTextarea"
import FormContacts from "./FormContacts"
import { useAuth } from "@/context/authContext"
import { isUserDefined } from "@/utils/typeGuards"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { firestore } from "../../firebase"


const formSchema = z.object({
    product: z.string().trim(),
    category: z.string().trim(),
    description: z.string().trim(),
    phoneNumber: z.string().trim(),
    email: z.string().trim()
})

const SellForm = () => {
    const [images, setImages] = useState<File[]>([])
    const { user } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: '',
            category: '',
            description: '',
            phoneNumber: '',
            email: '',
        }
    });

    const imageHandler = (img: File[]) => {
        setImages(img)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        console.log(images)
        // await addDoc(collection(firestore, 'products'), {
        //     values
        // })
        // await setDoc(doc(firestore, 'products'), {
        //     values
        // })
    }

    return (

        <div className="w-full flex flex-col items-center" >
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-initial w-full max-w-[1000px] p-4 gap-6  text-slate-800">
                    <FormLabel className=" text-slate-800 text-2xl">Какво продаваш</FormLabel>
                    <div className="flex flex-col gap-6 bg-slate-200 p-4">
                        <FormInput name='product' type='text' placeholder='Име на обявата' className="bg-white" />
                        <FormSelect name='category' placeholder='Избери категория' />
                    </div>
                    <ImageUpload imageHandler={imageHandler} />
                    <FormTextarea name='description' />
                    <FormContacts />
                    <Button type="submit">Добави обява</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default SellForm