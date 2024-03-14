"use client";
import { authenticateUser } from "@/actions/accountActions";
import SubmitButton from "@/components/utils/SubmitButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

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
  }, [state]);

  const handleFormSubmit = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <>
      <form
        className="space-y-6"
        action={(formData) => {
          handleFormSubmit(formData);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
        <div>
          <SubmitButton text="Sign in" />
        </div>
      </form>
    </>
  );
}
