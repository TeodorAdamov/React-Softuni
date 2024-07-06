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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col items-center gap-5 ">
                <FormLabel className='text-3xl'>Вход</FormLabel>
                <FormInput name='email' type='text' placeholder='Имейл' />
                <FormInput name='password' type='password' placeholder='Парола' />
                <Button className='' type="submit">Вход</Button>
            </form>
        </FormProvider>
    )
}

export default Login