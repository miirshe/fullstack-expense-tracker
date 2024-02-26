"use client";
import React, { useTransition } from "react";
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
import { signIn } from "next-auth/react";
import { loginSchema, registerSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userLogin } from "@/actions/auth/loginAction";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";

const LoginPgae = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitFunction = async (values: z.infer<typeof loginSchema>) => {
    try {
      startTransition(() => {
        userLogin(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              form.reset();
            }

            if (data?.success) {
              form.reset();
            }
          })
          .catch((error) => {
            console.log(error);
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
          <CardTitle className="text-center">Trash Cash</CardTitle>
          <CardDescription>Welcome to Trash Cash 👋✋</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitFunction)}>
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
                disabled={isPending}
                className="w-full text-center mt-5"
                type="submit"
                variant={"default"}
              >
                {isPending ? <FiLoader className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
          <p className="mt-3 text-center space-x-2">
            <span>I don't have an account?</span>
            <Link className="text-red-600" href={"/auth/register"}>
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPgae;
