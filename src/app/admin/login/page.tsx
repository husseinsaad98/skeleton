import { LoginForm } from "@/forms/login-form";
import Image from "next/image";

export default async function Page() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <Image
            src="/logo.webp"
            width={246}
            height={149}
            priority
            className="mx-auto"
            alt="Picture of the author"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Trouble signing in?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
