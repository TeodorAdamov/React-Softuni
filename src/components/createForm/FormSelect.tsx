import { FormControl, FormField, FormItem, FormMessage } from "@/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/ui/select"
import { useFormContext } from "react-hook-form"

type selectInputProps = {
    placeholder: string,
    name: string,
}

const FormSelect = ({ placeholder, name }: selectInputProps) => {
    const { control } = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger className="bg-white mb-3 max-w-[500px]">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel>{placeholder}</SelectLabel>
                                    <SelectItem value="Въдици">Въдици</SelectItem>
                                    <SelectItem value="Макари">Макари</SelectItem>
                                    <SelectItem value="Примамки">Примамки</SelectItem>
                                    <SelectItem value="Куки">Куки</SelectItem>
                                    <SelectItem value="Влакна">Влакна</SelectItem>
                                    <SelectItem value="Аксесоари">Аксесоари</SelectItem>
                                    <SelectItem value="Облекло и обувки">Облекло и обувки</SelectItem>
                                    <SelectItem value="Лодки и мотори">Лодки и мотори</SelectItem>
                                    <SelectItem value="Други">Други</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage className='text-base'/>
                </FormItem>
            )}
        />
    )
}

export default FormSelect