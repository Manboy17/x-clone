"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { createPost } from "@/utils/actions/post.action";
import { parseUser } from "@/utils/helpers";

interface FormTweetProps {
  user: string;
}

const formSchema = z.object({
  tweet: z.string().min(3, { message: "Tweet is too short" }),
});

const FormTweet = ({ user }: FormTweetProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const parsedUser = parseUser(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tweet: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const newPost = await createPost({
        user: parsedUser,
        description: values.tweet,
        path: pathname,
      });

      if (newPost) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full relative">
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="What is happening?!"
                  {...field}
                  disabled={isLoading}
                  className="
                  disabled:opacity-80 
                  peer 
                  dark:placeholder:text-gray-400
                  text-neutral-800
                  dark:text-neutral-300
                  resize-none 
                  mt-3 
                  w-full 
                  ring-0 
                  outline-none 
                  text-[15px]
                  md:text-[20px]
                  placeholder-neutral-500
                  bg-transparent
                  "
                ></textarea>
              </FormControl>
              <FormMessage className="text-red-500 absolute" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            variant="organge"
            className="text-white rounded-full disabled:opacity-80"
            size="sm"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Tweet"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTweet;
