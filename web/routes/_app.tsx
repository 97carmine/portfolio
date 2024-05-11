import { PageProps } from "$fresh/server.ts";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";

export default ({ Component, url }: PageProps) => {
  const href = IS_BROWSER ? document.location.href : url.href;

  return (
    <html lang="en">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={href} />
        <link rel="alternate" href={href} lang="en" />
      </Head>
      <body>
        <Component />
      </body>
    </html>
  );
};
