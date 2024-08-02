import { useAuth } from "@/context/authContext"
import { documentByIdRef, firestore, getChatsForUser, getMessagesForChat } from "@/firebase"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addDoc, collection, getDoc, onSnapshot, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Product } from "../products/Products"

type Message = {
    message: string,
    receiver: string,
    sender: string,
    adId: string,
    timestamp: Timestamp,
    adName: string,
    chatCreator: string
}

const MyMessages = () => {
    const { user } = useAuth()
    const [chats, setChats] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [selectedChat, setSelectedChat] = useState<Message[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const getMessages = async () => {
            if (user?.email) {
                const email = user.email;
                const unsubscribe = onSnapshot(getChatsForUser(email), (snapshot) => {
                    const messages: Message[] = snapshot.docs.map((doc) => doc.data() as Message);
                    const uniqueChats = new Map<string, Message>();


                    messages.forEach(message => {
                        if (!uniqueChats.has(message.adId)) {
                            uniqueChats.set(message.adId, message);
                        }
                    });

                    setChats(Array.from(uniqueChats.values()))

                });
                return () => unsubscribe();
            }

        }
        getMessages()
    }, [user])

    const clickChatHandler = async (adId: string, sender: string, receiver: string) => {
        if (adId) {
            try {
                const doc = await getDoc(documentByIdRef(adId))
                if (doc.exists()) {
                    const data = doc.data() as Product;
                    const id = doc.id;

                    setProduct({ ...data, id })
                }
            } catch (err) {
                console.log(err);
            }

        }

        if (user?.email) {
            const unsubscribe = onSnapshot(getMessagesForChat(sender, receiver, adId), (snapshot) => {
                const messages: Message[] = [];
                snapshot.forEach(doc => messages.push(doc.data() as Message));
                setSelectedChat(messages);
            });
            return () => unsubscribe();
        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

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

        if (product) {
            const ms = {
                message,
                receiver: product.email,
                sender: user?.email,
                adId: product.id,
                timestamp: Timestamp.now(),
                adName: product.product,
                chatCreator: product.displayName
            }
            await addDoc(collection(firestore, 'messages'), ms);
            setMessage('');
        }

    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-2 w-full items-center sm:items-center md:items-center xl:items-start md:px-44 xl:flex-row 2xl:max-w-[1600px] overflow-y-auto">
            <aside className="max-w-96 w-full rounded-md">
                <ul className="flex flex-col gap-3 px-3">
                    {chats.map((chat, i) =>
                        <li key={i} className="bg-slate-200 p-3 rounded-md">
                            <button onClick={() => clickChatHandler(chat.adId, chat.sender, chat.receiver)} className="flex flex-col items-start w-full">
                                <div className="flex justify-between w-full">
                                    <p className="text-sm">{chat.chatCreator}</p>
                                    <span className="text-xs">{new Date(chat.timestamp.toMillis()).toLocaleString()}</span>
                                </div>
                                <p>{chat.adName}</p>
                                <p>{chat.message}</p>
                            </button>
                        </li>
                    )}
                </ul>
            </aside>
            <div className="bg-white flex flex-col flex-1 h-full p-3 rounded-md overflow-y-auto justify-center">
                {product ?
                    <>
                        <ul className="flex-1 flex flex-col gap-2 break-words">
                            {selectedChat.map((m, i) =>
                                <li
                                    className={m.sender === user?.email ? 'self-end text-white bg-slate-800 px-3 py-1 rounded-xl break-words'
                                        :
                                        'text-slate-800 bg-slate-200 px-3 py-1 rounded-xl break-words self-start'}
                                    key={i}>
                                    <p className="break-words max-w-96">
                                        {m.message}
                                    </p>
                                </li>)}
                        </ul>

                        <div className="justify-end pt-10">
                            <Label htmlFor="message">Напишете съобщение</Label>
                            <div className="flex items-center justify-center relative">
                                <Input
                                    name="message"
                                    value={message}
                                    onChange={handleInputChange}
                                    className="border-r-0 pr-10"
                                    onKeyDown={(e) => eventDispatcher(e,)}
                                />
                                <button onClick={eventDispatcher} className="absolute right-1 border-l px-1">
                                    <FontAwesomeIcon className="text-slate-800 text-xl" icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <p className="text-center">ИЗБЕРЕТЕ ЧАТ ЗА ДА ЗАРЕДИТЕ СЪОБЩЕНИЯТА</p>
                }
            </div>
        </div>
    )
}

export default MyMessages