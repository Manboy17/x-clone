"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IUser } from "@/utils/models/user.model";
import { updateUser } from "@/utils/actions/user.action";
import { usePathname } from "next/navigation";
import ImageUpload from "../ImageUpload";
import { DialogClose } from "../ui/dialog";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  username: z.string().min(3, { message: "Username is too short" }),
  bio: z.string(),
  profileImage: z.string(),
  imageCover: z.string(),
});

interface FormEditProps {
  user: IUser;
}

const FormEdit = ({ user }: FormEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profileImage: user?.profileImage || "",
      imageCover: user?.imageCover || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await updateUser({
        id: user?._id,
        user: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          profileImage: values.profileImage,
          imageCover: values.imageCover,
        },
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 pt-5"
      >
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  disabled={isLoading}
                  onChange={field.onChange}
                  label="Upload profile image"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageCover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  disabled={isLoading}
                  onChange={field.onChange}
                  label="Upload cover image"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="You name"
                  className=""
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
                  className=""
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your bio"
                  className=""
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button
            type="submit"
            disabled={isLoading}
            className="disabled:opacity-80"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default FormEdit;
