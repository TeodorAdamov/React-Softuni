import { FormControl, FormField, FormItem, FormMessage, } from '@/ui/form';
import { Input } from '@/ui/input';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    name: string,
    type: string,
}

const FormInput = ({ name, type }: FormInputProps) => {
    const { control } = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input type={type} placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput