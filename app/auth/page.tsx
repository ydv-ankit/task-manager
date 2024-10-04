"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { account, ID } from "@/lib/appwrite";
import { toast } from "@/hooks/use-toast";
import React from "react";

const FormSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: "Password must have atleast 6 characters" }),
});

export default function Auth() {
    const [isLogin, setIsLogin] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onFormSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            const currentUser = await account.getSession("current");
            if (currentUser)
                await account.deleteSession("current").catch((err) => err);
            if (isLogin) {
                const resp = await account.createEmailPasswordSession(
                    data.email,
                    data.password,
                );
                if (resp) {
                    router.push("/");
                }
            } else {
                const resp = await account.create(
                    ID.unique(),
                    data.email,
                    data.password,
                );
                if (resp) {
                    toast({
                        title: "Account created",
                        description:
                            "We've created your account for you.\nLogin to continue",
                    });
                }
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    (error instanceof Error && error.message) ||
                    "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="max-w-md w-full space-y-6 border border-gray-100 p-4 rounded-md"
                >
                    <h2 className="text-2xl">Sign Up</h2>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="flex"
                                        placeholder="Password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between gap-2">
                        <Button
                            type="submit"
                            onClick={() => setIsLogin(false)}
                            className="max-w-32"
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                        <Button
                            type="submit"
                            className="max-w-32"
                            onClick={() => setIsLogin(true)}
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
