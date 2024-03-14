"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z, ZodError } from "zod";
import { FormActionResult } from "./formActionResult";

interface Fields {
  email: string;
  password: string;
}
export async function authenticateUser(
  prevState: {
    message: string;
    isSuccess: boolean;
    errors: Record<keyof Fields, string> | undefined;
    fieldValues: Fields;
  },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
  });

  try {
    schema.parse({
      email,
      password,
    });
    try {
      const result = await db.authenticate(email, password);
      const { record, token } = result;
      record.token = token;
      cookies().set("pb_auth", db.client.authStore.exportToCookie());
      revalidatePath("/admin/login");
      return {
        message: `Success`,
        isSuccess: true,
        errors: undefined,
        fieldValues: {
          email,
          password,
        },
      };
    } catch (err: any) {
      return {
        message: err.response.message,
        isSuccess: false,
        errors: undefined,
        fieldValues: {
          email,
          password,
        },
      };
    }
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "Validation error",
      isSuccess: false,
      errors: {
        email: errorMap["email"]?.[0] ?? "",
        password: errorMap["password"]?.[0] ?? "",
      },
      fieldValues: {
        email,
        password,
      },
    };
  }
}

export async function signOut(): Promise<FormActionResult> {
  try {
    cookies().delete("pb_auth");

    return { message: "Successfully signed out", isSuccess: true };
  } catch (error) {
    return { message: "Failed to sign out", isSuccess: false };
  }
}
