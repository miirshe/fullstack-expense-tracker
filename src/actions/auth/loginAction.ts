"use server";

import { loginSchema } from "@/schemas/userSchemas";
import { z } from "zod";

export const userLogin = async (values : z.infer<typeof loginSchema>) => {
    try{
        const validateFields = loginSchema.safeParse(values);

        if(!validateFields.success){
            return { error : "invalid fields"}
        }

        const { email , password} = validateFields.data;

    }catch(error) {
        console.error(error)
    }
}