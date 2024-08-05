import { FormLabel } from "@/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import { Button } from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useAuth } from "@/context/authContext";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

const formSchema = z.object({
    oldpass: z.string().trim(),
    newpassword: z.string().trim().min(6, {
        message: 'Паролата трябва да бъде най - малко 6 символа.'
    }),
    renewpassword: z.string().trim().min(6, {
        message: 'Паролата трябва да бъде най - малко 6 символа.'
    }),
}).refine((data) => data.newpassword === data.renewpassword, {
    message: "Паролите не съвпадат",
    path: ['renewpassword']
})

const Profile = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState<string>('');


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldpass: '',
            newpassword: '',
            renewpassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { oldpass, newpassword } = values

        if (user) {
            const credential = EmailAuthProvider.credential(user.email!, oldpass)
            try {
                const userCredentials = await reauthenticateWithCredential(user, credential)
                const signedUser = userCredentials.user
                await updatePassword(signedUser, newpassword);
                setMessage('Паролата е променена успешно!');
                setTimeout(() => {
                    setMessage('');
                }, 5000)

            } catch (err) {
                if (err instanceof FirebaseError) {
                    const error = err.message == 'Firebase: Error (auth/invalid-credential).' ? 'Старата парола е грешна' : 'Прекалено много опити.'
                    form.setError('oldpass', { type: 'manual', message: error });
                    setMessage('');
                }
            }
        }


    }



    return (
        <FormProvider {...form}>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] flex flex-col items-center gap-5 bg-slate-200 p-4 rounded-md shadow-inner">
                    <FormLabel className='text-3xl'>Смяна на парола</FormLabel>
                    <FormInput name='oldpass' type='password' placeholder='Стара парола' className='bg-white' />
                    <FormInput name='newpassword' type='password' placeholder='Нова парола' className='bg-white' />
                    <FormInput name='renewpassword' type='password' placeholder='Повтори паролата' className='bg-white' />
                    <Button type="submit">Смяна на парола</Button>
                </form>
                {message && <p className="text-center text-green-500 text-2xl">{message}</p>}
            </div>

        </FormProvider>
    )
}




export default Profile