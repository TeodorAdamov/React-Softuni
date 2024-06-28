import { Button } from '@/ui/button';
import { FormLabel, } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import FormInput from './FormInput';


const formSchema = z.object({
    email: z.string().trim().email({
        message: 'Enter a valid email.'
    }),
    password: z.string().trim().min(6, {
        message: 'Password must be at least 6 characters.'
    }),
    repass: z.string().trim().min(6, {
        message: 'Re-password must be at least 6 characters.'
    })
}).refine((data) => data.password === data.repass, {
    message: "Passwords don't match!",
    path: ['repass']
})

const Register = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            repass: ''
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(user => console.log(user)) /// TODOO SET USER IN CONTEXT 
            .catch(err => {
                const error = err.message == 'Firebase: Error (auth/email-already-in-use).' ? 'Email is already in use ' : 'Register Error'
                form.setError('email', { type: 'manual', message: error });
            })
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col items-center gap-5 ">
                <FormLabel>Register</FormLabel>
                <FormInput name='email' type='text' />
                <FormInput name='password' type='password' />
                <FormInput name='repass' type='password' />
                <Button className='' type="submit">Register</Button>
            </form>
        </FormProvider>
    )
}

export default Register