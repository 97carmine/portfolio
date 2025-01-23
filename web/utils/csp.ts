import { ContentSecurityPolicyDirectives } from "$fresh/runtime.ts";

export function applyCSP(
  csp: { directives: ContentSecurityPolicyDirectives },
  baseUrl: URL
) {
  csp.directives.styleSrc ??= [];
  csp.directives.imgSrc ??= [];

  const styleSources = [
    "/styles/index.css",
    "/styles/bulma.min.css",
    "/styles/page.css",
  ];

  const imgSources = [
    "/images/logo.png",
    "/images/personal.webp",
    "/images/support.webp",
    "/favicon.ico",
    "/android-icon-36x36.png",
    "/android-icon-48x48.png",
    "/android-icon-72x72.png",
    "/android-icon-96x96.png",
    "/android-icon-144x144.png",
    "/android-icon-192x192.png",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/apple-icon.png",
    "/apple-icon-precomposed.png",
    "/apple-icon-57x57.png",
    "/apple-icon-60x60.png",
    "/apple-icon-72x72.png",
    "/apple-icon-76x76.png",
    "/apple-icon-114x114.png",
    "/apple-icon-120x120.png",
    "/apple-icon-144x144.png",
    "/apple-icon-152x152.png",
    "/apple-icon-180x180.png",
    "/apple-touch-icon.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon-96x96.png",
    "/manifest.json",
    "/ms-icon-70x70.png",
    "/ms-icon-144x144.png",
    "/ms-icon-150x150.png",
    "/ms-icon-310x310.png",
  ];

  styleSources.forEach((src) =>
    csp.directives.styleSrc!.push(new URL(src, baseUrl).toString())
  );
  imgSources.forEach((src) =>
    csp.directives.imgSrc!.push(new URL(src, baseUrl).toString())
  );
}
