"use client";

import { BackButton } from "@/components/back-button";
import { AdvancedEditor } from "@/components/editor/advanced-editor";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { defaultEditorContent, defaultEditorContentFA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LoaderIcon, Save, Upload } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import { PostData, PostRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onUpload } from "@/lib/image-upload";
import { Switch } from "@/components/ui/switch";

interface IPostModuleProps
  extends Omit<React.BaseHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  postData?: PostData;
  onSubmit: (data: PostRequest) => void;
  isPending: boolean;
}

const PostModule = React.forwardRef<HTMLFormElement, IPostModuleProps>(
  ({ postData, onSubmit, isPending, className }, ref) => {
    const { t, i18n } = useTranslation("post");

    const [content, setContent] = useState<JSONContent | null>(null);

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
      setValue,
    } = useForm({
      resolver: zodResolver(postSchema(t)),
    });

    useEffect(() => {
      if (postData) {
        reset({
          title: postData.title ?? "",
          description: postData.description ?? "",
          cover: postData.cover ?? "",
          category: postData.category ?? "",
          published: postData.published ?? false,
        });
      }
      if (postData?.content) {
        setContent(JSON.parse(postData?.content));
      } else {
        const content = window.localStorage.getItem("novel-content");
        if (content) {
          setContent(JSON.parse(content));
        } else {
          setContent(
            i18n.resolvedLanguage === "fa"
              ? defaultEditorContentFA
              : defaultEditorContent
          );
        }
      }
    }, [postData]);

    const handleImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event?.target?.files) {
        const file = event.target.files[0];

        if (!file.type.includes("image/")) {
          toast.error(t("image.error-type"));
          return;
        }
        if (file.size / 1024 / 1024 > 4) {
          toast.error(t("image.error-too-big"));
          return;
        }

        const result = await onUpload(t, file);

        setValue("cover", result);
      } else {
        toast.error(t("image.error-general"));
      }
    };

    const submit = (formValues: Partial<PostRequest>) => {
      onSubmit({
        ...formValues,
        content: JSON.stringify(content),
      } as PostRequest);
    };

    return (
      <form onSubmit={handleSubmit(submit)} ref={ref} className={cn(className)}>
        <div className="w-full shadow-md bg-background sticky top-0 z-20">
          <div className="container py-4 flex justify-between items-center">
            <BackButton className="relative w-32" ltrClass="" rtlClass="" />
            <h2 className="text-4xl font-bold">
              {postData?.title ?? t("new-post")}
            </h2>
            <Button
              type="submit"
              className="w-32 gap-1"
              disabled={isPending || Object.keys(errors).length !== 0}
            >
              {isPending ? <LoaderIcon /> : <Save />}
              {isPending ? t("saving") : t("save")}
            </Button>
          </div>
        </div>
        <div className="mt-6 container grid grid-cols-3 gap-6">
          <div className="col-span-1 h-full">
            <div className="w-full shadow-sm h-full border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg p-5">
              <h2 className="text-2xl font-bold">{t("post-settings")}</h2>
              <h3 className="mt-4 mb-2 text-md font-semibold">{t("title")}</h3>
              <Input {...register("title")} placeholder={t("title")} />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.title?.message as string}
                </p>
              )}
              <h3 className="mt-4 text-md font-semibold">
                {t("cover-picture")}
              </h3>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label
                  htmlFor="cover-picture"
                  className={cn(
                    "mt-2 relative w-full rounded-lg cursor-pointer bg-secondary gap-1",
                    watch("cover") ? " h-80" : "h-36"
                  )}
                >
                  {watch("cover") && (
                    <Image
                      fill
                      alt={watch("title")}
                      className="object-cover rounded-lg"
                      src={watch("cover")}
                    />
                  )}
                  <div
                    className={cn(
                      "rounded-lg relative flex flex-col justify-center items-center w-full h-full bg-none hover:opacity-100 hover:bg-black/25 dark:hover:bg-white/15",
                      watch("cover") && "opacity-0 dark:hover:bg-black/15"
                    )}
                  >
                    <Upload
                      size={36}
                      strokeWidth={0.75}
                      className={cn(watch("cover") && "text-white/90")}
                    />
                    <p
                      className={cn(
                        "text-lg font-extralight",
                        watch("cover") && "text-white/90"
                      )}
                    >
                      {t("upload")}
                    </p>
                  </div>
                </label>
                <Input
                  id="cover-picture"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event)}
                />
              </div>
              <h3 className="mt-4 mb-2 text-md font-semibold">
                {t("category")}
              </h3>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        id="category"
                        className="capitalize"
                        placeholder={
                          field.value
                            ? t(`categories.${field.value}`)
                            : t("categories.choose")
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category} key={category}>
                          {t(`categories.${category}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.category?.message as string}
                </p>
              )}
              <h3 className="mt-4 mb-2 text-md font-semibold">
                {t("description")}
              </h3>
              <Textarea
                {...register("description")}
                placeholder={t("description")}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.description?.message as string}
                </p>
              )}
              <h3 className="mt-4 mb-2 text-md font-semibold">
                {t("publish")}
              </h3>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-2">
            <AdvancedEditor
              initialContent={content}
              onContentChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      </form>
    );
  }
);

PostModule.displayName = "PostModule";

export { PostModule };
