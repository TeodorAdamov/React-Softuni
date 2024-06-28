import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { User } from '../types/User'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';


const formSchema = z.object({
    email: z.string().email({
        message: 'Enter a valid email.'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.'
    }),
    repass: z.string().min(6, {
        message: "repass //TODO"
    })
})

const Register = () => {

    const [user, setUser] = useState<User>({} as User)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            repass: ''
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        setUser(values)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(user => console.log(user))
            .catch(err => console.log(err.message))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto flex flex-col items-center gap-5 ">
                <FormLabel>Register</FormLabel>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repass"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="repass" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='' type="submit">Register</Button>
            </form>
        </Form>
    )
}

export default Register