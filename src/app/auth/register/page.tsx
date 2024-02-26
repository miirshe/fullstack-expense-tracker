"use client";
import React, { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userRegister } from "@/actions/auth/registerAction";
import { FiLoader } from "react-icons/fi";
const RegisterPgae = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitFunction = async (values: z.infer<typeof registerSchema>) => {
    try {
      startTransition(() => {
        userRegister(values).then((data) => {
          if (data?.error) {
            console.log(data?.error);
            toast.error(data?.error);
            form.reset();
          }

          if (data?.success) {
            console.log(data?.success);
            toast.success(data?.success);
            form.reset();
            router.push("/auth/login");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Card className="md:w-[23rem] mx-3 md:mx-0">
        <CardHeader className="space-y-4">
          <CardTitle className="text-left">Trash Cash</CardTitle>
          <CardDescription>Welcome to Trash Cash 👋</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitFunction)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full md:w-[19rem]"
                        type="text"
                        placeholder="Enter Username..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full md:w-[19rem]"
                        type="email"
                        placeholder="Enter Email..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full md:w-[19rem]"
                        type="password"
                        placeholder="****"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button
                className="w-full text-center mt-5"
                type="submit"
                variant={"default"}
                disabled={isPending}
              >
                {isPending ? <FiLoader className="animate-spin mr-4" /> : null}
                <span>Register</span>
              </Button>
            </form>
          </Form>
          <p className="mt-3 text-center space-x-2">
            <span>already have an account?</span>
            <Link className="text-slate-600 " href={"/auth/login"}>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default RegisterPgae;
