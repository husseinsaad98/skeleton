"use client";
import { authenticateUser } from "@/actions/accountActions";
import FormInput from "@/components/utils/formInput";
import SubmitButton from "@/components/utils/SubmitButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFields } from "@/models/account";
import { AuthenticateSchema } from "@/schemas/accountSchema";

export function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(authenticateUser, {
    message: "",
    isSuccess: false,
    errors: undefined,
    fieldValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.isSuccess) router.push("/admin");
    else if (state.message) toast.error(state.message);
  }, [state]);

  const processForm: SubmitHandler<LoginFields> = (data) => {
    formAction(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(AuthenticateSchema),
  });

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit(processForm)}
        className="space-y-6"
      >
        <FormInput
          name="email"
          type={"text"}
          label="Email address"
          required={true}
          defaultValue={state.fieldValues.email}
          register={register("email")}
          errorMessage={errors.email?.message}
        />

        <FormInput
          name="password"
          label="Password"
          type={"password"}
          required={true}
          defaultValue={state.fieldValues.password}
          register={register("password")}
          errorMessage={errors.password?.message}
        />

        <div>
          <SubmitButton text="Sign in" />
        </div>
      </form>
    </>
  );
}
