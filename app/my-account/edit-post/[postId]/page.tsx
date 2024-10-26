"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorResponse, PostData, PostRequest } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { PostModule } from "@/components/post/post-module";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function EditPost() {
  const router = useRouter();
  const params = useParams<{ postId: string }>();

  const queryClient = useQueryClient();
  const queryKey = `post-${params.postId}`;
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    { message: string | null; post: PostData },
    AxiosError<ErrorResponse>
  >({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(`/api/posts/${params.postId}`).then((res) => res.data),
    initialData: queryClient.getQueryData([queryKey]),
  });

  useEffect(() => {
    if (isError) {
      if (error.response?.status === 404) {
        router.push("/my-posts");
      }
    }
  }, [isError]);

  const { mutate, isPending } = useMutation({
    mutationFn: (post: PostRequest) =>
      axios.put(`/api/posts/${params.postId}`, post),
    onSuccess: () => {
      router.push("/my-account");
    },
  });

  const onSubmit = (formValues: PostRequest) => {
    mutate(formValues);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute w-full min-h-screen z-50 bg-black/70 flex items-center justify-center">
          <Loader2 className="w-16 h-16 animate-spin duration-1000" />
        </div>
      )}
      {!isError && (
        <PostModule
          postData={isSuccess ? data.post : undefined}
          onSubmit={onSubmit}
          isPending={isPending}
          className={cn(isLoading && "max-h-screen overflow-hidden")}
        />
      )}
    </>
  );
}
