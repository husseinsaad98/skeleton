import { HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  type: HTMLInputTypeAttribute | undefined;
  name: string;
  required: boolean | undefined;
  label: string;
  defaultValue: string | number | readonly string[] | undefined;
  errorMessage: string | undefined;
  register: any;
}

export default function FormInput({
  type,
  name,
  required,
  defaultValue,
  label,
  register,
  errorMessage,
}: FormInputProps) {
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            id={name}
            defaultValue={defaultValue}
            name={name}
            type={type}
            autoComplete="current-password"
            required={required}
            {...register}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
          />
          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}
