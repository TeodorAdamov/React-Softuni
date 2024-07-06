import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormMessage, } from '@/ui/form';
import { Input } from '@/ui/input';

import { useFormContext } from 'react-hook-form';

type FormInputProps = {
    name: string,
    type: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean
    value?: string
}

const FormInput = ({ name, type, placeholder, className, disabled, value }: FormInputProps) => {
    const { control } = useFormContext()


    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            {...field}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={value}
                            className={cn('p-6 text-lg bg-slate-200', className)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput