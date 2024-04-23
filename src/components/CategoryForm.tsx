"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySchema } from "@/schemas/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { createCategory } from "@/actions/category/categoryActions";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
const CategoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmitFunction = async (values: z.infer<typeof CategorySchema>) => {
    try {
      startTransition(() => {
        createCategory(values).then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            form.reset();
          } else {
            toast.error(data?.error as any);
          }
        });
      });
    } catch (error) {
      throw new Error(error as any).message;
    }
  };
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Category Form</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitFunction)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Name"
                        {...field}
                        className="w-full"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        {...field}
                        className="w-full"
                        rows={5}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button type="submit">
                  {isPending ? (
                    <FiLoader className="mr-3 animate-spin" size={20} />
                  ) : null}
                  <span>Save changes</span>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryForm;
