import { Button } from '@/ui/button';
import { FormLabel, } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../common/FormInput';
import { useAuth } from '@/context/authContext';
import { FirebaseError } from 'firebase/app';
import { Input } from '@/ui/input';



const formSchema = z.object({
    email: z.string().trim().email({
        message: 'Въведи валиден имейл.'
    }),
    displayName: z.string({ message: 'Enter display name' }).trim(),
    password: z.string().trim().min(6, {
        message: 'Паролата трябва да бъде най - малко 6 символа.'
    }),
    repass: z.string().trim()
}).refine((data) => data.password === data.repass, {
    message: "Паролите не съвпадат",
    path: ['repass']
})

const Register = () => {
    const { register } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            displayName: '',
            password: '',
            repass: ''
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            await register(values.email, values.password, values.displayName);
        } catch (err: unknown) {
            form.resetField('password');
            form.resetField('repass');
            if (err instanceof FirebaseError) {
                const error = err.message == 'Firebase: Error (auth/email-already-in-use).' ? 'Имейл адресът е зает!' : 'Грешка'
                form.setError('email', { type: 'manual', message: error });
            }
        }
    }

    return (
        <FormProvider {...form}>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 bg-slate-200 p-4 rounded-md shadow-inner">
                    <FormLabel className='text-3xl'>Регистрация</FormLabel>
                    <FormInput name='email' type='text' placeholder='Имейл' className='bg-white' />
                    <FormInput name='displayName' type='text' placeholder='Потребителско име' className='bg-white' />
                    <FormInput name='password' type='password' placeholder='Парола' className='bg-white' />
                    <FormInput name='repass' type='password' placeholder='Повтори паролата' className='bg-white' />
                    <Button className='' type="submit">Регистрация</Button>
                </form>
            </div>
        </FormProvider>
    )
}

export default Register