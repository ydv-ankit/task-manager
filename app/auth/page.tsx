"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must have atleast 6 characters" }),
});

export default function Auth() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const resp = await axios({
        url: "/api/auth",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      return resp.data;
    },
    onSuccess: () => {
      console.log("Success");
    },
    onError: () => {
      console.log("Error");
    },
  });

  async function onFormSubmit(data: z.infer<typeof FormSchema>) {
    formMutation.mutate(data);
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
