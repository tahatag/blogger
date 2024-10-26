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
import { uploadFn } from "@/lib/image-upload";
import { TFunction } from "i18next";

export const suggestionItems = (dictionary: TFunction<any, any>) =>
  createSuggestionItems([
    {
      title: dictionary("slash-command.paragraph.title"),
      description: dictionary("slash-command.paragraph.description"),
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
      title: dictionary("slash-command.checklist.title"),
      description: dictionary("slash-command.checklist.description"),
      searchTerms: ["todo", "task", "list", "check", "checkbox"],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: dictionary("slash-command.heading-1.title"),
      description: dictionary("slash-command.heading-1.description"),
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
      title: dictionary("slash-command.heading-2.title"),
      description: dictionary("slash-command.heading-2.description"),
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
      title: dictionary("slash-command.heading-3.title"),
      description: dictionary("slash-command.heading-3.description"),
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
      title: dictionary("slash-command.bullet-list.title"),
      description: dictionary("slash-command.bullet-list.description"),
      searchTerms: ["unordered", "point"],
      icon: <List size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: dictionary("slash-command.numbered-list.title"),
      description: dictionary("slash-command.numbered-list.description"),
      searchTerms: ["ordered"],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: dictionary("slash-command.quote.title"),
      description: dictionary("slash-command.quote.description"),
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
      title: dictionary("slash-command.code.title"),
      description: dictionary("slash-command.code.description"),
      searchTerms: ["codeblock"],
      icon: <Code size={18} />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: dictionary("slash-command.image.title"),
      description: dictionary("slash-command.image.description"),
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
            uploadFn(dictionary)(file, editor.view, pos);
          }
        };
        input.click();
      },
    },
    {
      title: dictionary("slash-command.youtube.title"),
      description: dictionary("slash-command.youtube.description"),
      searchTerms: ["video", "youtube", "embed"],
      icon: <Youtube size={18} />,
      command: ({ editor, range }) => {
        const videoLink = prompt(dictionary("slash-command.youtube.prompt"));
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
            alert(dictionary("slash-command.youtube.error"));
          }
        }
      },
    },
    {
      title: dictionary("slash-command.twitter.title"),
      description: dictionary("slash-command.twitter.description"),
      searchTerms: ["twitter", "embed"],
      icon: <Twitter size={18} />,
      command: ({ editor, range }) => {
        const tweetLink = prompt(dictionary("slash-command.twitter.prompt"));
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
            alert(dictionary("slash-command.twitter.error"));
          }
        }
      },
    },
  ]);

export const slashCommand = (dictionary: TFunction<any, any>) =>
  Command.configure({
    suggestion: {
      items: () => suggestionItems(dictionary),
      render: renderItems,
    },
  });
