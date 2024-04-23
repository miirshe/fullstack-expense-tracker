"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas/CategorySchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createCategory = async (
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  const { name, description } = validatedFields.data;
  const currentUser = await auth();
  const userId = currentUser?.user?.id;
  try {
    const create = await db.category.create({
      data: {
        name: name,
        description: description,
        userId: userId as string,
      },
    });

    if (!create) {
      return { error: "Something went wrong!" };
    }
    return { success: "Created successfully" };
  } catch (error) {
    throw new Error(error as any).message;
  }
  revalidatePath("/dashboard/category");
  redirect("/dashboard/category");
};

export const getCategories = async () => {
  try {
    const currentUser = await auth();
    const userId = currentUser?.user?.id;
    const categories = await db.category.findMany({
      where: { userId: userId },
    });

    if (categories.length == 0) {
      return { error: "Categories are empty!" };
    }
    return { data: categories };
  } catch (error) {
    throw new Error(error as any).message;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (!id) {
      return { error: "Invalid id!" };
    }
    const isExistingCategory = await db.category.findUnique({
      where: { id: id },
    });
    if (!isExistingCategory) {
      return { error: "Category is not exist!" };
    }
    const deleteCategory = await db.category.delete({ where: { id: id } });
    if (!deleteCategory) {
      return { error: "Something went wrong!" };
    }
    return { success: "Category deleted successfully" };
  } catch (error) {
    throw new Error(error as any).message;
  }
};
