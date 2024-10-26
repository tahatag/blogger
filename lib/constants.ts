export const PROTECTED_ROUTES = ["/account"];

export const renderPublicRoutes = (localizedRoutes: { [key: string]: string }) => [
  {
    label: localizedRoutes["home"],
    url: "/",
  },
  {
    label: localizedRoutes["about-us"],
    url: "/about-us",
  },
];

export const renderPrivateRoutes = (localizedRoutes: { [key: string]: string }) => [
  {
    label: localizedRoutes["my-account"],
    url: "/my-account",
  },
];

export const categories = [
  "music",
  "books",
  "science",
  "sports",
  "technology",
  "news",
  "food",
  "daily",
  "entertainment",
];

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing Blogger" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/tahatag/blogger",
                target: "_blank",
              },
            },
          ],
          text: "Blogger",
        },
        {
          type: "text",
          text: " uses a Notion-style WYSIWYG editor. Built with ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://novel.sh/",
                target: "_blank",
              },
            },
          ],
          text: "Novel",
        },
        {
          type: "text",
          text: " on top of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
              },
            },
          ],
          text: "Tiptap",
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Installation" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "pnpm i" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Add tweets from the command slash menu:",
                },
              ],
            },
            {
              type: "twitter",
              attrs: {
                src: "https://x.com/elonmusk/status/1800759252224729577",
              },
            },
          ],
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star us on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/tahatag/blogger",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "GitHub",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "#",
                        target: "_self",
                      },
                    },
                  ],
                  text: "Deploy your own",
                },
                { type: "text", text: " to Vercel" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const defaultEditorContentFA = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "معرفی بلاگر" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/tahatag/blogger",
                target: "_blank",
              },
            },
          ],
          text: "بلاگر",
        },
        {
          type: "text",
          text: " از یک ویرایش‌گر متن استفاده می‌کند که با ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://novel.sh/",
                target: "_blank",
              },
            },
          ],
          text: "Novel",
        },
        {
          type: "text",
          text: " و بر اساس ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
              },
            },
          ],
          text: "Tiptap",
        },
        { type: "text", text: " ساخته شده است." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "نصب" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "pnpm i" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "ویژگی‌ها" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "اسلش منو و منوی حبابی" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "آپلود تصاویر (با کپی پیست، کشیدن و رها کردن و یا از اسلش منو)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "از اسلش منو می‌توانید توییت اضافه کنید:",
                },
              ],
            },
            {
              type: "twitter",
              attrs: {
                src: "https://x.com/jadi/status/1314203769970728961",
              },
            },
          ],
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "بیشتر" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "در " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/tahatag/blogger",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "گیت‌هاب",
                },
                { type: "text", text: " ستاره بدهید" },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "در Vercel " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "#",
                        target: "_self",
                      },
                    },
                  ],
                  text: "عرضه کنید",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const QueryError = new Map<string, number>([
  ["P2000", 400],
  ["P2001", 404],
  ["P2002", 409],
  ["P2003", 409],
  ["P2004", 400],
  ["P2005", 400],
  ["P2006", 400],
  ["P2007", 400],
  ["P2008", 400],
  ["P2009", 400],
  ["P2010", 500],
  ["P2011", 400],
  ["P2012", 400],
  ["P2013", 400],
  ["P2014", 400],
  ["P2015", 404],
  ["P2016", 400],
  ["P2017", 400],
  ["P2018", 404],
  ["P2019", 400],
  ["P2020", 400],
  ["P2021", 404],
  ["P2022", 404],
  ["P2023", 400],
  ["P2024", 500],
  ["P2025", 404],
  ["P2026", 400],
  ["P2027", 500],
]);

export const postDataInclude = (userId: string | undefined) => ({
  _count: {
    select: {
      likedBy: true,
    },
  },
  likedBy: {
    where: { userId },
    select: { userId: true },
  },
  bookmarkedBy: {
    where: { userId },
    select: { userId: true },
  },
  category: {
    select: {
      name: true,
    },
  },
  author: {
    select: {
      id: true,
      image: true,
      name: true,
    },
  },
});

export const postDataOmit = {
  categoryId: true,
  authorId: true,
};
