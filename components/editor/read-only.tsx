"use client";
import { EditorContent, EditorRoot, type JSONContent } from "novel";
import { ImageResizer } from "novel/extensions";
import React from "react";
import { defaultExtensions } from "./extensions";

import { slashCommand } from "./slash-command";
import { useTranslation } from "next-i18next";
import { cn } from "@/lib/utils";

interface IReadOnlyEditorProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  initialContent: JSONContent | null;
}

const ReadOnlyEditor = React.forwardRef<HTMLDivElement, IReadOnlyEditorProps>(
  ({ className, initialContent }, ref) => {
    const { t } = useTranslation("post");

    if (!initialContent) return null;

    return (
      <EditorRoot>
        <EditorContent
          editable={false}
          initialContent={initialContent}
          extensions={[
            ...defaultExtensions(t("heading"), t("placeholder")),
            slashCommand(t),
          ]}
          ref={ref}
          className={cn(
            "relative min-h-[500px] px-12 w-full border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg",
            className
          )}
          editorProps={{
            attributes: {
              class:
                "prose prose-lg dark:prose-invert !px-0 !py-16 prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={() => {}}
          slotAfter={<ImageResizer />}
        />
      </EditorRoot>
    );
  }
);

ReadOnlyEditor.displayName = "AdvancedEditor";

export { ReadOnlyEditor };
