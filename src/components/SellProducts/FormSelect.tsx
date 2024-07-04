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
                        <Select onValueChange={field.onChange} name={name}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel>{placeholder}</SelectLabel>
                                    <SelectItem value="apple">Rods</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="banana">Hooks</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormSelect