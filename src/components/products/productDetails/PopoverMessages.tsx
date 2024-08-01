import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/ui/popover"
import { Product } from "../Products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { useAuth } from "@/context/authContext"
import { addDoc, collection, onSnapshot, Timestamp } from "firebase/firestore"
import { firestore, getMessagesForChat } from "@/firebase"

type PopoverMessagesProps = {
    product: Product

}

type Message = {
    message: string,
    receiver: string,
    sender: string,
    adId: string,
    timestamp: Timestamp
}

const PopoverMessages = ({ product }: PopoverMessagesProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Message[]>([]);
    const { user } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }



    useEffect(() => {
        const getMessages = async () => {
            if (user?.email) {
                const unsubscribe = onSnapshot(getMessagesForChat(product.id), (snapshot) => {
                    const messages: Message[] = [];
                    snapshot.forEach(doc => messages.push(doc.data() as Message));
                    setChat(messages);
                });

                return () => unsubscribe();
            }
        }
        getMessages()
    }, [])

    const eventDispatcher = async (e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
        if ('key' in e) {
            if (e.key === 'Enter') {
                await submitHandler()
            }
            return;
        }
        await submitHandler();
    }

    const submitHandler = async () => {

        if (!message) {
            return
        }
        const ms = {
            message,
            receiver: product.email,
            sender: user?.email,
            adId: product.id,
            timestamp: Timestamp.now()
        }
        await addDoc(collection(firestore, 'messages'), ms);
        setMessage('');
    }
    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <button onClick={() => setIsOpen(true)} className="bg-slate-800 text-slate-200 p-2 rounded-md font-bold text-2xl">СЪОБЩЕНИЕ</button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-[450px] sm:w-96">
                <div className="flex flex-col h-full gap-2">
                    <div className="flex justify-between border-b">
                        <p>{product.displayName}</p>
                        <button onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon className='text-2xl' icon={faX} />
                        </button>
                    </div>
                    <div className="flex gap-2 border-b pb-2">
                        <div className="w-12">
                            <img className="rounded-sm" src={product.images[0]} alt="" />
                        </div>
                        <div>
                            <p>{product.product}</p>
                            <p className="font-bold text-slate-800">{product.price} лв.</p>
                        </div>
                    </div>
                    <div className="flex flex-1 overflow-y-auto border-b">
                        <ul className="flex-1 flex flex-col gap-2">
                            {chat.map((m, i) =>
                                <li
                                    className={m.sender === user?.email ? 'self-end text-slate-800 bg-slate-200 px-3 py-1 rounded-xl' : ''}
                                    key={i}
                                >{m.message}
                                </li>)}
                        </ul>
                    </div>
                    <div>
                        <Label htmlFor="message">Напишете съобщение</Label>
                        <div className="flex items-center justify-center relative">
                            <Input
                                name="message"
                                value={message}
                                onChange={handleInputChange}
                                className="border-r-0 pr-10"
                                onKeyDown={eventDispatcher}
                            />
                            <button onClick={eventDispatcher} className="absolute right-1 border-l px-1">
                                <FontAwesomeIcon className="text-slate-800 text-xl" icon={faPaperPlane} />
                            </button>
                        </div>

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PopoverMessages