/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Settings,
  Plus,
  Trash2,
  Save,
  Sun,
  Moon,
  Palette,
  Clock,
  Tag,
} from "lucide-react";
import { z } from "zod";

import { updateProfileSchema } from "@/lib/zod";
import { updateUserProfileInfo } from "@/actions/user.action";
import {
  categoryCreateAction,
  categoryDeleteAction,
  categoryUpdateAction,
} from "@/actions/category.actions";

enum TimeLimit {
  Open_Settings = "Open_Settings",
  Block_Settings = "Block_Settings",
  Limit_Settings = "Limit_Settings",
  Close_Settings = "Close_Settings",
}

const timeLimits = [
  { key: TimeLimit.Open_Settings, label: TimeLimit.Open_Settings },
  { key: TimeLimit.Block_Settings, label: TimeLimit.Block_Settings },
  { key: TimeLimit.Close_Settings, label: TimeLimit.Close_Settings },
  { key: TimeLimit.Limit_Settings, label: TimeLimit.Limit_Settings },
];

const createCategorySchema = z.object({
  category: z.string(),
  color: z.string(),
});

function CategoryForm({
  category,
  color,
  id,
  isDark,
}: {
  category: string;
  color: string;
  id: number;
  isDark: boolean;
}) {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentColor, setCurrentColor] = useState(color);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (currentColor !== color || currentCategory !== category) {
        await categoryUpdateAction({
          id,
          category: currentCategory,
          color: currentColor,
        });
        toast.success("Category updated successfully");
      } else {
        await categoryDeleteAction({ id });
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = () =>
    currentColor !== color || currentCategory !== category
      ? "Update"
      : "Delete";

  const isUpdate = currentColor !== color || currentCategory !== category;

  return (
    <div
      className={`w-full backdrop-blur-xl border shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
        isDark
          ? "bg-slate-900/80 border-slate-700/50 shadow-purple-500/10"
          : "bg-white/80 border-slate-200/50 shadow-slate-500/10"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-4 h-4 rounded-full border-2 border-white/50"
          style={{ backgroundColor: currentColor }}
        />
        <h3
          className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Category Settings
        </h3>
      </div>

      <form className="space-y-4 flex flex-col" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Tag
                className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
              />
            </div>
            <input
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                isDark
                  ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                  : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter category name"
              type="text"
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
            />
            <label
              className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                isDark
                  ? "text-slate-300 bg-slate-900"
                  : "text-slate-700 bg-white"
              } rounded`}
            >
              Category Name
            </label>
          </div>

          {/* Color Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Palette
                className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
              />
            </div>
            <input
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                isDark
                  ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                  : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="#000000"
              type="text"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
            />
            <label
              className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                isDark
                  ? "text-slate-300 bg-slate-900"
                  : "text-slate-700 bg-white"
              } rounded`}
            >
              Hex Color
            </label>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-3 px-6 rounded-xl max-w-40 mx-auto self-center font-semibold text-white shadow-lg transition-all duration-300 ${
            isUpdate
              ? isDark
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
              : isDark
                ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                : "bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800"
          } hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 ">
              {isUpdate ? (
                <Save className="w-5 h-5" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
              {buttonText()}
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

type Props = {
  data: {
    id: number;
    color: string;
    category: string;
  }[];
};

export function ProfilePageClient(props: Props) {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newCategoryFormState, setNewCategoryFormState] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user?.name!);
      setEmail(session?.user?.email!);
    }
  }, [status]);

  const handleCreateNewCategory = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const { category, color } = createCategorySchema.parse(data);

      await categoryCreateAction({ category, color });
      setNewCategoryFormState(false);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const parsedData = updateProfileSchema.parse(data);
      const { email, username, timeLimit } = parsedData;

      const result = await updateUserProfileInfo(username, email, timeLimit);

      if (result.status) {
        toast.success("Profile updated successfully");
        await sessionUpdate({
          user: {
            ...session?.user,
            email: email,
            name: username,
          },
        });
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status !== "authenticated") return null;

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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
              isDark
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-blue-600 to-purple-700"
            }`}
          >
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1
            className={`text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Profile Settings
          </h1>
          <p
            className={`text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div
            className={`backdrop-blur-xl border shadow-2xl rounded-3xl p-8 lg:p-10 ${
              isDark
                ? "bg-slate-900/80 border-slate-700/50 shadow-purple-500/10"
                : "bg-white/80 border-slate-200/50 shadow-slate-500/10"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <User
                className={`w-6 h-6 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Account Information
              </h2>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              {/* Username Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User
                    className={`w-5 h-5 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                </div>
                <input
                  required
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                      : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  name="username"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                    isDark
                      ? "text-slate-300 bg-slate-900"
                      : "text-slate-700 bg-white"
                  } rounded`}
                >
                  Username
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail
                    className={`w-5 h-5 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                </div>
                <input
                  required
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                      : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* Time Limit Select */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Clock
                    className={`w-5 h-5 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                </div>
                <select
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? "bg-slate-800/50 border-slate-600 text-white focus:border-blue-500 focus:bg-slate-800/80"
                      : "bg-white/50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white/80"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  name="timeLimit"
                >
                  <option value="">Select a Time Limit</option>
                  {timeLimits.map((limit) => (
                    <option key={limit.key} value={limit.key}>
                      {limit.label}
                    </option>
                  ))}
                </select>
                <label
                  className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                    isDark
                      ? "text-slate-300 bg-slate-900"
                      : "text-slate-700 bg-white"
                  } rounded`}
                >
                  Time Limit Setting
                </label>
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
                    Updating Profile...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Update Profile
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Categories
            </h2>
            <p
              className={`text-lg ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage your content categories
            </p>
          </div>

          {/* Existing Categories */}
          <div className="space-y-6 mb-8">
            {props.data.map((categoryItem) => (
              <CategoryForm
                key={categoryItem.id}
                {...categoryItem}
                isDark={isDark}
              />
            ))}
          </div>

          {/* New Category Form */}
          {newCategoryFormState && (
            <div
              className={`backdrop-blur-xl border shadow-2xl rounded-3xl p-8 mb-8 ${
                isDark
                  ? "bg-slate-900/80 border-slate-700/50 shadow-purple-500/10"
                  : "bg-white/80 border-slate-200/50 shadow-slate-500/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Plus
                  className={`w-6 h-6 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                />
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Create New Category
                </h3>
              </div>

              <form
                className="space-y-6 flex flex-col"
                onSubmit={handleCreateNewCategory}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Name */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Tag
                        className={`w-5 h-5 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      />
                    </div>
                    <input
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                        isDark
                          ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                          : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      name="category"
                      placeholder="Enter category name"
                      type="text"
                    />
                    <label
                      className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                        isDark
                          ? "text-slate-300 bg-slate-900"
                          : "text-slate-700 bg-white"
                      } rounded`}
                    >
                      Category Name
                    </label>
                  </div>

                  {/* Color */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Palette
                        className={`w-5 h-5 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      />
                    </div>
                    <input
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200 ${
                        isDark
                          ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:bg-slate-800/80"
                          : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-white/80"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      name="color"
                      placeholder="#000000"
                      type="text"
                    />
                    <label
                      className={`absolute -top-2 left-3 px-2 text-xs font-medium ${
                        isDark
                          ? "text-slate-300 bg-slate-900"
                          : "text-slate-700 bg-white"
                      } rounded`}
                    >
                      Hex Color
                    </label>
                  </div>
                </div>

                <button
                  className={`w-full py-4 px-6 max-w-60 rounded-xl font-semibold text-white self-center shadow-lg transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                  } hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Category...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />
                      Create Category
                    </div>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Add Category Button */}
          <div className="text-center">
            <button
              className={`py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-slate-800/50 border-slate-600 text-white hover:bg-slate-800/80"
                  : "bg-white/50 border-slate-300 text-slate-900 hover:bg-white/80"
              } border backdrop-blur-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              disabled={newCategoryFormState}
              type="button"
              onClick={() => setNewCategoryFormState(true)}
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Category
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { Form, Input, Button } from "@heroui/react";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { Select, SelectItem } from "@heroui/react";

// import { updateProfileSchema } from "@/lib/zod";
// import { updateUserProfileInfo } from "@/actions/user.action";
// import {
//   categoryCreateAction,
//   categoryDeleteAction,
//   categoryUpdateAction,
// } from "@/actions/category.actions";
// import { z } from "zod";

// enum TimeLimit {
//   Open_Settings = "Open_Settings",
//   Block_Settings = "Block_Settings",
//   Limit_Settings = "Limit_Settings",
//   Close_Settings = "Close_Settings",
// }

// const timeLimits = [
//   { key: TimeLimit.Open_Settings, label: TimeLimit.Open_Settings },
//   { key: TimeLimit.Block_Settings, label: TimeLimit.Block_Settings },
//   { key: TimeLimit.Close_Settings, label: TimeLimit.Close_Settings },
//   { key: TimeLimit.Limit_Settings, label: TimeLimit.Limit_Settings },
// ];

// const createCategorySchema = z.object({
//   category: z.string(),
//   color: z.string(),
// });

// function CategoryForm({
//   category,
//   color,
//   id,
// }: {
//   category: string;
//   color: string;
//   id: number;
// }) {
//   const onSubmit = (e: any) => {
//     e.preventDefault();
//     if (currentColor !== color || currentCategory !== category) {
//       // zod validation
//       categoryUpdateAction({
//         id,
//         category: currentCategory,
//         color: currentColor,
//       });
//     } else {
//       categoryDeleteAction({ id });
//     }
//   };

//   const [currentCategory, setCurrentCategory] = useState(category);
//   const [currentColor, setCurrentColor] = useState(color);

//   const buttonText = () =>
//     currentColor !== color || currentCategory !== category
//       ? "update"
//       : "delete";

//   return (
//     <div className="!w-full max-w-screen-md flex gap-4 justify-between mx-auto items-end">
//       <Input
//         isRequired
//         errorMessage="Please enter your Category"
//         label="Category"
//         labelPlacement="outside"
//         name="category"
//         placeholder="Enter your category"
//         type="text"
//         value={currentCategory}
//         onChange={(e) => setCurrentCategory(e.target.value)}
//       />
//       <Input
//         isRequired
//         errorMessage="Please enter a Hex color Value"
//         label="Color"
//         labelPlacement="outside"
//         name="color"
//         placeholder="Enter your category color"
//         type="text"
//         value={currentColor}
//         onChange={(e) => setCurrentColor(e.target.value)}
//       />
//       <Button type="button" variant="bordered" onClick={onSubmit}>
//         {buttonText()}
//       </Button>
//     </div>
//   );
// }

// type Props = {
//   data: {
//     id: number;
//     color: string;
//     category: string;
//   }[];
// };

// export function ProfilePageClient(props: Props) {
//   const { data: session, status, update: sessionUpdate } = useSession();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");

//   const handleCreateNewCategory = async (e: any) => {
//     try {
//       e.preventDefault();
//       const data = Object.fromEntries(new FormData(e.currentTarget));
//       // zod validation
//       const { category, color } = createCategorySchema.parse(data);

//       await categoryCreateAction({ category, color });
//       setNewCategoryFormState(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [newCategoryFormState, setNewCategoryFormState] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       setUsername(session?.user?.name!);
//       setEmail(session?.user?.email!);
//     }
//   }, [status]);

//   const onSubmit = async (e: any) => {
//     e.preventDefault();
//     const data = Object.fromEntries(new FormData(e.currentTarget));
//     const parsedData = updateProfileSchema.parse(data);
//     console.log({ parsedData });
//     const { email, username, timeLimit } = parsedData;

//     const result = await updateUserProfileInfo(username, email, timeLimit);

//     if (result.status) {
//       toast.success("User info updated successfully");
//       await sessionUpdate({
//         user: {
//           ...session?.user,
//           email: email,
//           name: username,
//         },
//       });
//     } else {
//       toast.error("Failled to update the user info");
//     }
//   };

//   if (status !== "authenticated") return null;

//   return (
//     <div className="text-center">
//       <h1 className="mb-16 text-3xl text-slate-50">User Profile Settings</h1>
//       <Form className="w-full max-w-xs mx-auto" onSubmit={onSubmit}>
//         <Input
//           errorMessage="Please enter a valid Username"
//           label="Username"
//           labelPlacement="outside"
//           name="username"
//           placeholder="Enter your username"
//           type="Input"
//           value={username!}
//           onChange={(data) => setUsername(data.target.value)}
//         />
//         <Input
//           errorMessage="Please enter a valid email"
//           label="Email"
//           labelPlacement="outside"
//           name="email"
//           placeholder="Enter your email"
//           type="email"
//           value={email!}
//           onChange={(data) => setEmail(data.target.value)}
//         />
//         <Select
//           className="max-w-xs"
//           name="timeLimit"
//           // value={timeLimit}
//           items={timeLimits}
//           label="Time Limit Setting"
//           labelPlacement="outside"
//           placeholder="Select a Time Limit"
//         >
//           {(animal) => <SelectItem>{animal.label}</SelectItem>}
//         </Select>
//         <Button type="submit" variant="bordered">
//           Submit
//         </Button>
//       </Form>
//       <h1 className="my-16 text-3xl text-slate-50">Categories</h1>
//       <div className="flex flex-col gap-y-8 my-16">
//         {props.data.map((categoryItem) => (
//           <CategoryForm key={categoryItem.id} {...categoryItem} />
//         ))}
//       </div>
//       {newCategoryFormState && (
//         <Form
//           className="w-full max-w-xs mx-auto my-16"
//           onSubmit={handleCreateNewCategory}
//         >
//           <Input
//             isRequired
//             errorMessage="Please enter a Category Name"
//             label="Category"
//             labelPlacement="outside"
//             name="category"
//             placeholder="Enter category name"
//             type="text"
//           />
//           <Input
//             isRequired
//             errorMessage="Please enter a hex color value"
//             label="Hex Color Value"
//             labelPlacement="outside"
//             name="color"
//             placeholder="Enter your category color"
//             type="text"
//           />
//           <Button type="submit" variant="bordered">
//             Create
//           </Button>
//         </Form>
//       )}
//       <Button
//         type="button"
//         variant="bordered"
//         disabled={newCategoryFormState}
//         onClick={() => setNewCategoryFormState(true)}
//         className={`${newCategoryFormState && "cursor-not-allowed opacity-20 hover:!opacity-20 mb-16"}`}
//       >
//         Add Category
//       </Button>
//     </div>
//   );
// }
