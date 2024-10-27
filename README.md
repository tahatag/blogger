# Blogger - A Fullstack Blog Application

Blogger is a fullstack blog platform inspired by Medium. It’s built with **Next.js**, **TypeScript**, **Prisma**, **Shadcn**, and **Tailwind CSS**. Blogger includes rich features like a WYSIWYG editor, authentication, multi-language support, and both light and dark themes.

## Features

- **User Authentication**: GitHub SSO using **NextAuth** with **Supabase** for user data.
- **WYSIWYG Editor**: A modern editor based on **TipTap** via the **Novel** library.
- **Dark Mode and Light Mode**: Theme switcher for user preference.
- **Multi-Language Support**: English and Persian support with **i18next**.
- **Real-Time Data Management**: Uses **TanStack Query** for efficient server state management.
- **Form Validation**: Forms are validated using **react-hook-form** and **zod**.
- **Responsive Design**: Styled with **Tailwind CSS** and Shadcn components.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn UI components, Novel editor
- **Backend**: Next.js API Routes, Prisma ORM, Supabase (PostgreSQL)
- **Authentication**: NextAuth with GitHub SSO
- **Database**: Supabase (PostgreSQL)
- **Data Fetching**: TanStack Query, Axios
- **Form Validation**: react-hook-form, Zod
- **Internationalization (i18n)**: i18next, next-i18next

## Getting Started

1.  **Clone the Repository**

    ````bash
    git clone https://github.com/tahatag/blogger.git
    cd blogger```

    ````

2.  **Install Dependencies**\
    This project uses pnpm. Install it if you don’t have it:
    `bash
    npm install -g pnpm
    `
    Then install the dependencies:

        ```bash
        pnpm install
        ```

3.  **Set Up Environment Variables**\
    Create a .env file in the root directory:
    ```bash
    DATABASE_URL=your_database_url
    DIRECT_URL=your_direct_url
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    Run Database Migrations Use Prisma to migrate the database:
    ```bash
    pnpm prisma migrate dev
    ```
4.  **Seed the Database (Optional)**

    ```bash
    pnpm prisma db seed
    ```

5.  **Start the Development Server**
    `bash
    pnpm dev
    `
    \
    The application should now be running at http://localhost:2055.
