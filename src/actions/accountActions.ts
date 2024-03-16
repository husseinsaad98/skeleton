"use server";

import db from "@/db";
import { AuthenticateSchema } from "@/schemas/accountSchema";
import { LoginFields } from "@/models/account";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z, ZodError } from "zod";
import { FormActionResult } from "./formActionResult";

type Inputs = z.infer<typeof AuthenticateSchema>;

export async function authenticateUser(
  prevState: {
    message: string;
    isSuccess: boolean;
    errors: Record<keyof LoginFields, string> | undefined;
    fieldValues: LoginFields;
  },
  formData: Inputs
) {
  const { email, password } = formData;
  try {
    AuthenticateSchema.parse(formData);
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
        message: "Wrong email or password",
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
      message: `Validation error ${errorMap["email"]?.[0] ?? ""} ${
        errorMap["password"]?.[0] ?? ""
      }`,
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
