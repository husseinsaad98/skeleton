"use client";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "@/actions/accountActions";
import { useFormState } from "react-dom";
import { FormActionResult } from "@/actions/formActionResult";
import { useRouter } from "next/navigation";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const initialState: FormActionResult = {
  message: "",
  isSuccess: false,
};
export default function Toggle() {
  const [state, formAction] = useFormState(signOut, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.isSuccess) router.push("/admin/login");
    return () => {};
  }, [state]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form action={formAction}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
