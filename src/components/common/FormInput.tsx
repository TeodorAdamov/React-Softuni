import { FormControl, FormField, FormItem, FormMessage, } from '@/ui/form';
import { Input } from '@/ui/input';

import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    name: string,
    type: string,
    placeholder: string,
}

const FormInput = ({ name, type, placeholder }: FormInputProps) => {
    const { control } = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field} name={name} type={type} placeholder={placeholder} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput