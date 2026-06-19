import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata = { title: "Page not found · Dr Marie Meechan" };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/tokens.css" />
        <link rel="stylesheet" href="/assets/css/site.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css"
        />
      </head>
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
