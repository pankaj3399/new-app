"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import { Eye, EyeOff, Sun, Moon, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { signup } from "@/actions/auth.actions";

type Data = {
  id: number;
  name: string;
  email: string;
};

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    let user;

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");

        return;
      }
      if (!formData.agreeToTerms) {
        toast.error("Please accept the terms and conditions");

        return;
      }

      user = await signup(formData.username, formData.email, formData.password);

      if (user.status && (user.data as Data).id) {
        toast.info("Signup Successful");
        router.push("/login");
      } else {
        // toast.info("Signup Failled");
        toast.error(JSON.stringify(user?.data as unknown as string));
        router.refresh();
      }
    } catch (error) {
      // @ts-ignore
      toast.error(JSON.stringify(user?.data as unknown as string));
      console.error(user?.data as unknown as string);
    }
  };

  const inputClasses = {
    inputWrapper: [
      "border-transparent",
      isDark ? "bg-gray-800/50" : "bg-white/50",
      "backdrop-blur-md",
      "group-data-[focus=true]:border-blue-500",
      "data-[hover=true]:border-blue-400",
    ].join(" "),
    input: isDark
      ? "text-white placeholder:text-gray-400"
      : "text-gray-900 placeholder:text-gray-500",
    label: isDark ? "text-gray-300" : "text-gray-700",
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-600" />
        )}
      </button>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-10 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
        />
        <div
          className={`absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
        />
      </div>

      <div
        className={`w-full max-w-md backdrop-blur-xl border-0 shadow-2xl rounded-3xl p-8 ${
          isDark
            ? "bg-gray-900/80 shadow-blue-500/10 border border-gray-700/50"
            : "bg-white/80 shadow-gray-500/10 border border-gray-200/50"
        }`}
      >
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isDark
                  ? "bg-gradient-to-br from-blue-500 to-purple-600"
                  : "bg-gradient-to-br from-blue-600 to-purple-700"
              }`}
            >
              <User className="w-8 h-8 text-white" />
            </div>
            <h1
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Create Account
            </h1>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Join us today and get started
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="Username"
            placeholder="Enter your fullname"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            classNames={inputClasses}
            variant="bordered"
            isRequired
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            classNames={inputClasses}
            variant="bordered"
            isRequired
          />

          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            classNames={inputClasses}
            variant="bordered"
            isRequired
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500`}
              >
                {isVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          <Input
            type={isConfirmVisible ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            classNames={inputClasses}
            variant="bordered"
            isRequired
            endContent={
              <button
                type="button"
                onClick={toggleConfirmVisibility}
                className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500`}
              >
                {isConfirmVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          <Checkbox
            isSelected={formData.agreeToTerms}
            onValueChange={(checked) =>
              handleInputChange("agreeToTerms", checked)
            }
            classNames={{
              base: "py-2",
              label: isDark ? "text-gray-300" : "text-gray-700",
              wrapper: isDark
                ? "before:border-gray-600"
                : "before:border-gray-400",
            }}
            size="sm"
          >
            I agree with the{" "}
            <Link
              href="#"
              className={`${isDark ? "text-blue-400" : "text-blue-600"} hover:underline`}
              size="sm"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className={`${isDark ? "text-blue-400" : "text-blue-600"} hover:underline`}
              size="sm"
            >
              Privacy Policy
            </Link>
          </Checkbox>

          <Button
            onClick={handleSubmit}
            className={`w-full font-semibold ${
              isDark
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
            } text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            size="lg"
            radius="lg"
          >
            Create Account
          </Button>

          <div className="text-center mt-4">
            <span
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"} hover:underline`}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import type { InputProps } from "@heroui/react";

// import React, { useState } from "react";
// import { Button, Input, Checkbox, Link } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// import { signup } from "@/actions/auth.actions";
// import { signUpSchema } from "@/lib/zod";

// export default function Signup() {
//   const { data: session, status } = useSession();

//   const [isVisible, setIsVisible] = React.useState(false);
//   const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
//   const [accepted, setAccepted] = useState(false);
//   const router = useRouter();

//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

//   const inputClasses: InputProps["classNames"] = {
//     inputWrapper:
//       "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
//   };

//   const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

//   if (status === "authenticated") router.push("/profile");

//   type Data = {
//     id: number;
//     name: string;
//     email: string;
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-default-100 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-50 mx-auto">
//         <p className="pb-2 text-xl font-medium">Sign Up</p>
//         <form
//           className="flex flex-col gap-3"
//           onSubmit={async (e) => {
//             let user;

//             try {
//               e.preventDefault();

//               if (!accepted) {
//                 toast.error("Please accept the terms and conditions");
//                 throw new Error("Please accept the terms and conditions");
//               }

//               const formData = new FormData(e.target as HTMLFormElement);
//               const data = Object.fromEntries(formData);
//               const parsedData = signUpSchema.parse(data);
//               const { username, email, password, confirmPassword } = parsedData;

//               if (password !== confirmPassword) {
//                 toast.error("Passwords do not match");
//                 throw new Error("Passwords do not match");
//               }
//               user = await signup(username, email, password);

//               if (user.status && (user.data as Data).id) {
//                 toast.info("Signup Successful");
//                 router.push("/login");
//               } else {
//                 // toast.info("Signup Failled");
//                 toast.error(JSON.stringify(user?.data as unknown as string));
//                 router.refresh();
//               }
//             } catch (error) {
//               // @ts-ignore
//               toast.error(JSON.stringify(user?.data as unknown as string));
//               console.error(user?.data as unknown as string);
//             }
//           }}
//         >
//           <Input
//             isRequired
//             classNames={inputClasses}
//             label="Username"
//             name="username"
//             placeholder="Enter your username"
//             type="text"
//             variant="bordered"
//           />
//           <Input
//             isRequired
//             classNames={inputClasses}
//             label="Email Address"
//             name="email"
//             placeholder="Enter your email"
//             type="email"
//             variant="bordered"
//           />
//           <Input
//             isRequired
//             classNames={inputClasses}
//             endContent={
//               <button type="button" onClick={toggleVisibility}>
//                 {isVisible ? (
//                   <Icon
//                     className="pointer-events-none text-2xl text-foreground/50"
//                     icon="solar:eye-closed-linear"
//                   />
//                 ) : (
//                   <Icon
//                     className="pointer-events-none text-2xl text-foreground/50"
//                     icon="solar:eye-bold"
//                   />
//                 )}
//               </button>
//             }
//             label="Password"
//             name="password"
//             placeholder="Enter your password"
//             type={isVisible ? "text" : "password"}
//             variant="bordered"
//           />
//           <Input
//             isRequired
//             classNames={inputClasses}
//             endContent={
//               <button type="button" onClick={toggleConfirmVisibility}>
//                 {isConfirmVisible ? (
//                   <Icon
//                     className="pointer-events-none text-2xl text-foreground/50"
//                     icon="solar:eye-closed-linear"
//                   />
//                 ) : (
//                   <Icon
//                     className="pointer-events-none text-2xl text-foreground/50"
//                     icon="solar:eye-bold"
//                   />
//                 )}
//               </button>
//             }
//             label="Confirm Password"
//             name="confirmPassword"
//             placeholder="Confirm your password"
//             type={isConfirmVisible ? "text" : "password"}
//             variant="bordered"
//           />
//           <Checkbox
//             isRequired
//             classNames={{
//               base: "py-4",
//               label: "text-foreground/50",
//               wrapper: "before:border-foreground/50",
//             }}
//             size="sm"
//             onValueChange={setAccepted}
//           >
//             I agree with the&nbsp;
//             <Link
//               className="relative z-[1]"
//               color="foreground"
//               href="#"
//               size="sm"
//             >
//               Terms
//             </Link>
//             &nbsp; and&nbsp;
//             <Link
//               className="relative z-[1]"
//               color="foreground"
//               href="#"
//               size="sm"
//             >
//               Privacy Policy
//             </Link>
//           </Checkbox>
//           <Button className={buttonClasses} type="submit">
//             Sign Up
//           </Button>
//         </form>
//         <p className="text-center text-small text-foreground/50">
//           Already have an account?&nbsp;
//           <Link color="foreground" href="/login" size="sm">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
