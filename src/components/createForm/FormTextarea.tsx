import { FormControl, FormField, FormItem, FormMessage, } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    name: string,

}

const FormTextarea = ({ name }: FormInputProps) => {
    const { control } = useFormContext()


    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Textarea
                            {...field}
                            name={name}
                            placeholder="Опишете продукта който продавате"
                            className="bg-slate-200 text-xl resize-none min-h-60 placeholder:text-2xl placeholder:text-center placeholder:focus:text-transparent placeholder:text-slate-800 shadow-inner" />
                    </FormControl>
                    <FormMessage className='text-base'/>
                </FormItem>
            )}
        />
    )
}

export default FormTextarea