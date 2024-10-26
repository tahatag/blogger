"use client";

import { useMutation } from "@tanstack/react-query";
import { PostRequest } from "@/lib/types";
import axios from "axios";
import { PostModule } from "@/components/post/post-module";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (post: PostRequest) => axios.post("/api/posts", post),
    onSuccess: (res) => {
      toast.success(res.data.message);
      router.push("/my-posts");
    },
  });

  const onSubmit = (formValues: PostRequest) => {
    mutate(formValues);
  };

  return <PostModule onSubmit={onSubmit} isPending={isPending} />;
}
