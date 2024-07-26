import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/ui/popover"
import { Product } from "../Products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

type PopoverMessagesProps = {
    product: Product

}

const PopoverMessages = ({ product }: PopoverMessagesProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <button onClick={() => setIsOpen(true)} className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-2xl">СЪОБЩЕНИЕ</button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-[450px] sm:w-96">
                <div className="flex flex-col h-full gap-2">
                    <div className="flex justify-between border-b pb-2">
                        <p>{product.displayName}</p>
                        <button onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon className='text-2xl' icon={faX} />
                        </button>
                    </div>
                    <div className="flex gap-2 border-b">
                        <div className="w-12">
                            <img className="rounded-sm" src={product.images[0]} alt="" />
                        </div>
                        <div>
                            <p>{product.product}</p>
                            <p className="font-bold text-slate-800">{product.price} лв.</p>
                        </div>
                    </div>
                    <div className="flex flex-1 overflow-y-auto border-b">
                        <ul className="flex-1 ">
                            <li>message1</li>
                            <li>message2</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                            <li>message3</li>
                        </ul>
                    </div>
                    <div>
                        <Label htmlFor="message">Напишете съобщение</Label>
                        <Input name="message"></Input>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PopoverMessages