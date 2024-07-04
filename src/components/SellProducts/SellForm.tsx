import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { Button } from "@/ui/button"
import { FormLabel } from "@/ui/form"


import FormInput from "../common/FormInput"
import FormSelect from "./FormSelect"


const formSchema = z.object({
    product: z.string().trim(),
    select: z.string().trim()
})

const SellForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: '',
            select: '',
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormLabel>Product Name</FormLabel>
                    <FormInput name='product' type='text' placeholder='Product Name' />
                    <FormSelect name='select' placeholder='Select Category' />
                    <Button type="submit">Add product</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default SellForm