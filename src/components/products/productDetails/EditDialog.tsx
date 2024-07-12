import FormInput from "@/components/common/FormInput"
import FormSelect from "@/components/createForm/FormSelect"
import FormTextarea from "@/components/createForm/FormTextarea"
import { Button } from "@/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog"
import { FormLabel } from "@/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Product } from "../Products"
import { setDoc } from "firebase/firestore"
import { documentByIdRef } from "@/firebase"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    product: z.string().trim().min(1, { message: 'Моля въведете име на обявата.' }).max(70, { message: 'Заглавието на обявата трябва да е под 70 символа' }),
    category: z.string().trim().min(1, { message: 'Моля изберете категория.' }),
    description: z.string().trim().min(10, { message: 'Описанието трябва да бъде минимум 10 символа.' }),
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

type EditDialogProps = {
    product: Product
    handleIsEdited: () => void

}


const EditDialog = ({ product, handleIsEdited }: EditDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: product.product,
            category: product.category,
            description: product.description,
            price: product.price,
        }
    });



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const docRef = documentByIdRef(product.id);
        await setDoc(docRef, values, { merge: true });
        handleIsEdited()
        setIsOpen(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <button onClick={() => setIsOpen(true)} className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-xl text-center">Редактирай</button>
            <DialogContent className="max-w-[400px] sm:max-w-[1200px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Редактирай обява</DialogTitle>
                    <DialogDescription>
                        Направете промени и натиснете потвърди за да запишете.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col items-center" >
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-initial w-full max-w-[1000px] p-4 gap-6  text-slate-800">
                            <FormLabel className=" text-slate-800 text-2xl">Какво продаваш</FormLabel>
                            <div className="flex flex-col gap-6 bg-slate-200 p-4 rounded-md shadow-inner">
                                <FormInput name='product' type='text' placeholder='Име на обявата' className='bg-white' />
                                <FormSelect name='category' placeholder='Избери категория' />
                            </div>

                            <FormTextarea name='description' />
                            <div className=' bg-slate-200 p-4 shadow-inner'>
                                <p className='text-center pb-4 text-slate-800 text-2xl'>Цена</p>
                                <FormInput name='price' type='text' placeholder='Цена' className='bg-white max-w-[500px]' />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Потвърди</Button>
                            </DialogFooter>
                        </form>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    )
}



export default EditDialog