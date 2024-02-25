"use client"
import React, { useTransition } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerSchema } from '@/schemas/userSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { userRegister } from '@/actions/auth/registerAction'

const RegisterPgae = () => {

    const [isPending , startTransition ] = useTransition()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const onSubmitFunction = async (values: z.infer<typeof registerSchema>) => {
        try {
            startTransition( ()=> {
                userRegister(values);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <Card className='md:w-[23rem] mx-3 md:mx-0'>
                <CardHeader className='space-y-4'>
                    <CardTitle className='text-center'>Trash Cash</CardTitle>
                    <CardDescription>Welcome to Trash Cash 👋✋</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitFunction)}>
                            <FormField control={form.control} name='username'
                                render={({ field }) => (
                                    <FormItem className='mt-4'>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input className='w-full md:w-[19rem]' type='text' placeholder='Enter Username...' {...field}
                                            disabled = { isPending } />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} >
                            </FormField>
                            <FormField control={form.control} name='email'
                                render={({ field }) => (
                                    <FormItem className='mt-4'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className='w-full md:w-[19rem]' type='email' placeholder='Enter Email...' {...field}
                                            disabled = { isPending }  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} >
                            </FormField>
                            <FormField control={form.control} name='password'
                                render={({ field }) => (
                                    <FormItem className='mt-4'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input className='w-full md:w-[19rem]' type='password' placeholder='****' {...field}
                                            disabled = { isPending }  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} >
                            </FormField>
                            <Button className='w-full text-center mt-5' type='submit' variant={"default"}>Register</Button>
                        </form>
                    </Form>
                    <p className='mt-3 text-center space-x-2'>
                        <span>already have an account?</span>
                        <Link className='text-red-600' href={"/auth/login"}>Login</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPgae