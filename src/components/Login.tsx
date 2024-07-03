import { Button } from '@/ui/button';
import { FormLabel, } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from './FormInput';
import { useAuth } from '@/context/authContext';
import { FirebaseError } from 'firebase/app';



const formSchema = z.object({
    email: z.string().trim().email({
        message: 'Enter a valid email.'
    }),
    password: z.string().trim().min(6, {
        message: 'Password must be at least 6 characters.'
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
                const error = err.message == 'Firebase: Error (auth/invalid-credential).' ? 'Email or password is incorrect' : 'Login Error'
                form.setError('email', { type: 'manual', message: error });
            }
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col items-center gap-5 ">
                <FormLabel>Login</FormLabel>
                <FormInput name='email' type='text' />
                <FormInput name='password' type='password' />
                <Button className='' type="submit">Login</Button>
            </form>
        </FormProvider>
    )
}

export default Login