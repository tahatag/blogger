import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Twitter,
  Youtube,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";
import { uploadFn } from "./image-upload";

export const suggestionItems = createSuggestionItems([
  {
    title: "متن",
    description: "یک پاراگراف ساده.",
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
    title: "چک لیست",
    description: "چک لیست برنامه‌ریزی.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "عنوان 1",
    description: "عنوان سکشن بزرگ.",
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
    title: "عنوان 2",
    description: "عنوان سکشن متوسط.",
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
    title: "عنوان 3",
    description: "عنوان سکشن کوچک.",
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
    title: "فهرست",
    description: "فهرست ساده.",
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "فهرست شماره‌دار",
    description: "فهرست شماره‌دار.",
    searchTerms: ["ordered"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "نقل قول",
    description: "یک نقل قول اضافه کنید.",
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
    title: "کد",
    description: "افزودن یک قطعه کد.",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "تصویر",
    description: "تصویر دلخواه خود را آپلود کنید.",
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
    title: "یوتیوب",
    description: "افزودن ویدیو از یوتیوب.",
    searchTerms: ["video", "youtube", "embed"],
    icon: <Youtube size={18} />,
    command: ({ editor, range }) => {
      const videoLink = prompt("لینک ویدیوی یوتیوب را وارد کنید");
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
          alert("لطفا لینک یک ویدیوی یوتیوب را وارد کنید");
        }
      }
    },
  },
  {
    title: "توییتر",
    description: "یک توییت در پست جای دهید.",
    searchTerms: ["twitter", "embed"],
    icon: <Twitter size={18} />,
    command: ({ editor, range }) => {
      const tweetLink = prompt("لینک توییت را وارد کنید");
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
          alert("لطفا یک لینک توییت صحیح را وارد کنید");
        }
      }
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
  HTMLAttributes: {
    class: "meowmeow",
  },
});
