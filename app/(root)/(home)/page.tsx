import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Avatar from "@/components/Avatar";
import Header from "@/components/Header";
import Post from "@/components/Post";
import FormTweet from "@/components/form/FormTweet";
import { SessionUserProps } from "@/lib/types";
import { getAllPosts } from "@/utils/actions/post.action";
import { getUserById } from "@/utils/actions/user.action";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session: SessionUserProps | null = await getServerSession(authOptions);

  const user = await getUserById({ userId: session?.user.id });
  const posts = await getAllPosts();
  return (
    <>
      <Header label="Home" />
      <div className="p-3">
        {user ? (
          <div className="flex flex-row gap-4">
            <div>
              <Avatar user={JSON.stringify(user)} />
            </div>
            <FormTweet user={JSON.stringify(user)} />
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 items-start">
            <h1 className="text-lg lg:text-2xl font-semibold mt-3">
              Welcome to Twitter!
            </h1>
            <p className="text-sm md:text-md text-gray-500">
              This is the best place to see what’s happening in <br /> your
              world. Find some people and topics to follow now.
            </p>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-center border-t-[1px] border-b-[1px] text-sm md:text-lg font-normal p-3 md:p-5">
          Recent Posts
        </h1>
        <div className="flex flex-col gap-5">
          {posts?.map((post: Record<string, any>) => (
            <Post
              key={post.id}
              user={JSON.stringify(user)}
              post={JSON.stringify(post)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
