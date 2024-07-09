import { Button } from '@/ui/button';
import { FormLabel, } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../common/FormInput';
import { useAuth } from '@/context/authContext';
import { FirebaseError } from 'firebase/app';



const formSchema = z.object({
    email: z.string().trim().email({
        message: 'Въведи валиден имейл.'
    }),
    password: z.string().trim().min(6, {
        message: 'Паролата трябва да бъде най - малко 6 символа.'
    })
})

const Login = () => {
    const { login } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            await login(values.email, values.password)
        } catch (err: unknown) {
            form.resetField('password');
            if (err instanceof FirebaseError) {
                const error = err.message == 'Firebase: Error (auth/invalid-credential).' ? 'Грешен имейл или парола.' : 'Грешка'
                form.setError('email', { type: 'manual', message: error });
            }
        }
    }

    return (
        <FormProvider {...form}>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col items-center gap-5 bg-slate-200 p-4 rounded-md shadow-inner">
                    <FormLabel className='text-3xl'>Вход</FormLabel>
                    <FormInput name='email' type='text' placeholder='Имейл' className='bg-white'/>
                    <FormInput name='password' type='password' placeholder='Парола' className='bg-white'/>
                    <Button className='' type="submit">Вход</Button>
                </form>
            </div>

        </FormProvider>
    )
}

export default Login