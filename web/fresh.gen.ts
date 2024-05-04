// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_contact from "./routes/api/contact.ts";
import * as $index from "./routes/index.tsx";
import * as $button from "./islands/button.tsx";
import * as $contact_form from "./islands/contact_form.tsx";
import * as $navbar_burger from "./islands/navbar_burger.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/contact.ts": $api_contact,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/button.tsx": $button,
    "./islands/contact_form.tsx": $contact_form,
    "./islands/navbar_burger.tsx": $navbar_burger,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
