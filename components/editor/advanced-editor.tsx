"use client";

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import React, { useState } from "react";
import { defaultExtensions } from "./extensions";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "../../lib/image-upload";
import { slashCommand, suggestionItems } from "./slash-command";
import { useDebouncedCallback } from "@/lib/useDebouncedCallback";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import { useTranslation } from "next-i18next";
import { cn } from "@/lib/utils";

const hljs = require("highlight.js");

interface IAdvancedEditorProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  initialContent: JSONContent | null;
  onContentChange: (newContent: JSONContent) => void;
}

const AdvancedEditor = React.forwardRef<HTMLDivElement, IAdvancedEditorProps>(
  ({ className, initialContent, onContentChange }, ref) => {
    const { t } = useTranslation("post");

    const [saveStatus, setSaveStatus] = useState(t("saved"));
    const [charsCount, setCharsCount] = useState();

    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    //Apply Codeblock Highlighting on the HTML from editor.getHTML()
    const highlightCodeblocks = (content: string) => {
      const doc = new DOMParser().parseFromString(content, "text/html");
      doc.querySelectorAll("pre code").forEach((el) => {
        // @ts-ignore
        // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
        hljs.highlightElement(el);
      });
      return new XMLSerializer().serializeToString(doc);
    };

    const debouncedUpdates = useDebouncedCallback(
      async (editor: EditorInstance) => {
        const json = editor.getJSON();
        setCharsCount(editor.storage.characterCount.words());
        window.localStorage.setItem(
          "html-content",
          highlightCodeblocks(editor.getHTML())
        );
        window.localStorage.setItem("novel-content", JSON.stringify(json));
        window.localStorage.setItem(
          "markdown",
          editor.storage.markdown.getMarkdown()
        );
        onContentChange(editor.getJSON());
        setSaveStatus(t("saved"));
      },
      500
    );

    if (!initialContent) return null;

    return (
      <div className="relative w-full">
        <div className="flex absolute right-5 top-5 z-10 gap-2">
          <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
            {saveStatus}
          </div>
          <div
            className={
              charsCount
                ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
                : "hidden"
            }
          >
            {charsCount} {t("words")}
          </div>
        </div>
        <EditorRoot>
          <EditorContent
            initialContent={initialContent}
            extensions={[
              ...defaultExtensions(t("heading"), t("placeholder")),
              slashCommand(t),
            ]}
            ref={ref}
            className={cn(
              "relative min-h-[500px] w-full border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg",
              className
            )}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn(t)),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn(t)),
              attributes: {
                class:
                  "prose prose-lg dark:prose-invert !py-16 prose-headings:font-title font-default focus:outline-none max-w-full",
              },
            }}
            onUpdate={({ editor }) => {
              debouncedUpdates(editor);
              setSaveStatus(t("unsaved"));
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                {t("no-results")}
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems(t).map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>
            <EditorBubble
              tippyOptions={{
                placement: "top",
              }}
              className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
            >
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <TextButtons />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          </EditorContent>
        </EditorRoot>
      </div>
    );
  }
);

AdvancedEditor.displayName = "AdvancedEditor";

export { AdvancedEditor };
