import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Text,
  TextQuote,
  Twitter,
  Youtube,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";
import { uploadFn } from "./image-upload";

export type slashCommandDictionaryType = {
  [key: string]: {
    title: string;
    description: string;
    prompt?: string;
    error?: string;
  };
};

export const suggestionItems = (dictionary: slashCommandDictionaryType) =>
  createSuggestionItems([
    {
      title: dictionary["paragraph"].title,
      description: dictionary["paragraph"].description,
      searchTerms: ["p", "paragraph"],
      icon: <Text size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: dictionary["checklist"].title,
      description: dictionary["checklist"].description,
      searchTerms: ["todo", "task", "list", "check", "checkbox"],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: dictionary["heading-1"].title,
      description: dictionary["heading-1"].description,
      searchTerms: ["title", "big", "large"],
      icon: <Heading1 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: dictionary["heading-2"].title,
      description: dictionary["heading-2"].description,
      searchTerms: ["subtitle", "medium"],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: dictionary["heading-3"].title,
      description: dictionary["heading-3"].description,
      searchTerms: ["subtitle", "small"],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: dictionary["bullet-list"].title,
      description: dictionary["bullet-list"].description,
      searchTerms: ["unordered", "point"],
      icon: <List size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: dictionary["numbered-list"].title,
      description: dictionary["numbered-list"].description,
      searchTerms: ["ordered"],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: dictionary["quote"].title,
      description: dictionary["quote"].description,
      searchTerms: ["blockquote"],
      icon: <TextQuote size={18} />,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      title: dictionary["code"].title,
      description: dictionary["code"].description,
      searchTerms: ["codeblock"],
      icon: <Code size={18} />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: dictionary["image"].title,
      description: dictionary["image"].description,
      searchTerms: ["photo", "picture", "media"],
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        // upload image
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0];
            const pos = editor.view.state.selection.from;
            uploadFn(file, editor.view, pos);
          }
        };
        input.click();
      },
    },
    {
      title: dictionary["youtube"].title,
      description: dictionary["youtube"].description,
      searchTerms: ["video", "youtube", "embed"],
      icon: <Youtube size={18} />,
      command: ({ editor, range }) => {
        const videoLink = prompt(dictionary["youtube"].prompt);
        //From https://regexr.com/3dj5t
        const ytregex = new RegExp(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
        );

        if (ytregex.test(videoLink ?? "")) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setYoutubeVideo({
              src: videoLink ?? "",
            })
            .run();
        } else {
          if (videoLink !== null) {
            alert(dictionary["youtube"].error);
          }
        }
      },
    },
    {
      title: dictionary["twitter"].title,
      description: dictionary["twitter"].description,
      searchTerms: ["twitter", "embed"],
      icon: <Twitter size={18} />,
      command: ({ editor, range }) => {
        const tweetLink = prompt(dictionary["twitter"].prompt);
        const tweetRegex = new RegExp(
          /^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/
        );

        if (tweetRegex.test(tweetLink ?? "")) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setTweet({
              src: tweetLink ?? "",
            })
            .run();
        } else {
          if (tweetLink !== null) {
            alert(dictionary["twitter"].error);
          }
        }
      },
    },
  ]);

export const slashCommand = (dictionary: slashCommandDictionaryType) =>
  Command.configure({
    suggestion: {
      items: () => suggestionItems(dictionary),
      render: renderItems,
    },
  });
