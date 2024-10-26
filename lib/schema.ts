import { TFunction } from "i18next";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postSchema = (dictionary: TFunction<any, any>) =>
  z
    .object({
      title: z
        .string({
          required_error: `${dictionary("title")} ${dictionary(
            "errors.required"
          )}`,
        })
        .min(1, `${dictionary("title")} ${dictionary("errors.required")}`),
      description: z
        .string({
          required_error: `${dictionary("description")} ${dictionary(
            "errors.required"
          )}`,
        })
        .min(
          1,
          `${dictionary("description")} ${dictionary("errors.required")}`
        ),
      category: z
        .string({
          required_error: `${dictionary("category")} ${dictionary(
            "errors.required"
          )}`,
        })
        .min(1, `${dictionary("category")} ${dictionary("errors.required")}`),
      cover: z.string(),
      content: z
        .string({
          required_error: `${dictionary("content")} ${dictionary(
            "errors.required"
          )}`,
        })
        .min(1, `${dictionary("content")} ${dictionary("errors.required")}`),
      published: z.boolean(),
    })
    .required({
      title: true,
      description: true,
      category: true,
    })
    .partial({
      cover: true,
      content: true,
      published: true,
    });
