"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/ui/spinner/Spinner";
import CompanyLogo from "@/img/ui/CompanyLogo.png";

export default function LoginForm() {
  const { loading, login, fieldErrors } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6 sm:px-8">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Karr Auto Focus
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your username and password to login
              </p>
            </div>

            <div>
              <Form onSubmit={handleLogin}>
                <div className="space-y-6">
                  <div>
                    <Label required>Username</Label>
                    <Input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      errors={fieldErrors.username}
                      autoFocus
                    />
                  </div>

                  <div>
                    <Label required>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        errors={fieldErrors.password}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-end">
                    <Link
                      href="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex gap-2">
                          <Spinner size="xs" />
                          Logging In...
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen items-center justify-center bg-transparent p-10">
          <Image
            className="object-contain max-w-full h-auto"
            src={CompanyLogo}
            alt="Company Logo"
            priority
          />
        </div>
      </div>
    </>
  );
}
