/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Sun,
  Moon,
  LogIn,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      formData;
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result.error) {
        toast.info("Login Successful");
        router.push("/profile");
      } else {
        toast.info("login Failled. Please try again");
      }
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      toast.error(error?.["issues"]?.[0]?.["message"]);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
            isDark
              ? "bg-gradient-to-r from-blue-400 to-purple-600"
              : "bg-gradient-to-r from-blue-300 to-purple-400"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 ${
            isDark
              ? "bg-gradient-to-r from-purple-400 to-pink-600"
              : "bg-gradient-to-r from-purple-300 to-pink-400"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-spin-slow ${
            isDark
              ? "bg-gradient-to-r from-green-400 to-blue-600"
              : "bg-gradient-to-r from-green-300 to-blue-400"
          }`}
        />
      </div>

      {/* Theme Toggle */}
      <button
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
          isDark
            ? "bg-white/10 border-white/20 hover:bg-white/20"
            : "bg-black/10 border-black/20 hover:bg-black/20"
        }`}
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Right Sign-in Form */}
      <div className="w-full min-h-screen lg:w-1/2 flex items-center justify-center p-6 lg:p-12 mx-auto">
        <div
          className={`w-full max-w-md backdrop-blur-xl border shadow-2xl rounded-3xl p-8 lg:p-10 ${
            isDark
              ? "bg-slate-900/80 border-slate-700/50 shadow-purple-500/10"
              : "bg-white/80 border-slate-200/50 shadow-slate-500/10"
          }`}
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                isDark
                  ? "bg-gradient-to-br from-blue-500 to-purple-600"
                  : "bg-gradient-to-br from-blue-600 to-purple-700"
              }`}
            >
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2
              className={`text-2xl lg:text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Sign In
            </h2>
            <p
              className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail
                  className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                />
              </div>
              <input
                required
                className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                  isDark
                    ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                    : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <label
                className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                  isDark
                    ? "text-slate-300 bg-slate-900"
                    : "text-slate-700 bg-white"
                } rounded`}
              >
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock
                  className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                />
              </div>
              <input
                required
                className={`w-full pl-12 pr-12 py-4 rounded-xl border transition-all duration-200 ${
                  isDark
                    ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                    : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                } hover:bg-slate-200/20`}
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <label
                className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                  isDark
                    ? "text-slate-300 bg-slate-900"
                    : "text-slate-700 bg-white"
                } rounded`}
              >
                Password
              </label>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  checked={formData.rememberMe}
                  className="w-4 h-4 rounded border-2 border-blue-500 text-blue-500 focus:ring-blue-500"
                  id="remember"
                  type="checkbox"
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                />
                <label
                  className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>

              <Link
                className={`text-sm font-medium transition-colors ${
                  isDark
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                } hover:underline`}
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
              } hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <span
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                Don&apos;t have an account?{" "}
              </span>
              <Link
                className={`text-sm font-semibold transition-colors ${
                  isDark
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                } hover:underline`}
                href="/signup"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// import type { InputProps } from "@heroui/react";

// import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useState } from "react";

// import { signInSchema } from "@/lib/zod";

// export default function Login() {
//   const { data: session, status } = useSession();

//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const router = useRouter();

//   const inputClasses: InputProps["classNames"] = {
//     inputWrapper:
//       "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
//   };

//   const buttonClasses = "w-full bg-foreground/10 dark:bg-foreground/20";

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     try {
//       event.preventDefault();
//       const formData = new FormData(event.target as HTMLFormElement);
//       const data = Object.fromEntries(formData);
//       const parsedData = signInSchema.parse(data);
//       const { email, password } = parsedData;

//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (!result.error) {
//         toast.info("Login Successful");
//         router.push("/profile");
//       } else {
//         toast.info("login Failled. Please try again");
//       }
//     } catch (error) {
//       // @ts-ignore
//       toast.error(error?.["issues"]?.[0]?.["message"]);
//       // eslint-disable-next-line no-console
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-default-100 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-50 mx-auto">
//         <p className="pb-2 text-xl font-medium">Log In</p>
//         <Form
//           className="flex flex-col gap-3"
//           validationBehavior="native"
//           onSubmit={handleSubmit}
//         >
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
//           <div className="flex w-full items-center justify-between px-1 py-2">
//             <Checkbox
//               classNames={{
//                 wrapper: "before:border-foreground/50",
//               }}
//               name="remember"
//               size="sm"
//             >
//               Remember me
//             </Checkbox>
//             <Link className="text-foreground/50" href="#" size="sm">
//               Forgot password?
//             </Link>
//           </div>
//           <Button className={buttonClasses} type="submit">
//             Log In
//           </Button>
//         </Form>
//         <p className="text-center text-small text-foreground/50">
//           Need to create an account?&nbsp;
//           <Button
//             type="button"
//             variant="light"
//             onClick={() => {
//               if (status === "authenticated") {
//                 router.push("/profile");
//               } else if (status === "unauthenticated") {
//                 router.push("/signup");
//               }
//             }}
//             className="hover:bg-transparent"
//           >
//             Sign Up
//           </Button>
//         </p>
//       </div>
//     </div>
//   );
// }
