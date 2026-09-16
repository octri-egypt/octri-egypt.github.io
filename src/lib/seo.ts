export const SITE_URL = "https://octri-egypt.github.io";
export const SITE_NAME = "OCTRI — Ocean Triathlon Team Egypt";
export const DEFAULT_TITLE = "OCTRI — Ocean Triathlon Team Egypt | Together We Tri";
export const DEFAULT_DESCRIPTION = "Egypt's premier triathlon team. Professional coaching for swimming, cycling, and running since 2017. Join our community in Cairo.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const DEFAULT_OG_IMAGE_ALT = "OCTRI Ocean Triathlon Team Egypt logo";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_TYPE = "image/jpeg";

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  ogType?: "website" | "article";
}

export function generateMetadata(props: SEOProps) {
  const title = props.title ? `${props.title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = props.description ?? DEFAULT_DESCRIPTION;
  const canonicalUrl = props.path ? `${SITE_URL}${props.path}` : SITE_URL;
  const ogImage = props.ogImage ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = props.ogImageAlt ?? DEFAULT_OG_IMAGE_ALT;
  const ogImageWidth = props.ogImageWidth ?? DEFAULT_OG_IMAGE_WIDTH;
  const ogImageHeight = props.ogImageHeight ?? DEFAULT_OG_IMAGE_HEIGHT;
  const ogImageType = props.ogImageType ?? DEFAULT_OG_IMAGE_TYPE;
  const ogType = props.ogType ?? "website";

  return { title, description, canonicalUrl, ogImage, ogImageAlt, ogImageWidth, ogImageHeight, ogImageType, ogType };
}

export function injectMetadata(meta: ReturnType<typeof generateMetadata>) {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:url"]',
    'meta[property="og:image"]',
    'meta[property="og:site_name"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
    'link[rel="canonical"]',
  ];
  selectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.remove();
  });

  const nameTags: Array<{ name: string; content: string }> = [
    { name: "description", content: meta.description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: meta.title },
    { name: "twitter:description", content: meta.description },
    { name: "twitter:image", content: meta.ogImage },
    { name: "twitter:image:alt", content: meta.ogImageAlt },
  ];

  const propertyTags: Array<{ property: string; content: string }> = [
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:type", content: meta.ogType },
    { property: "og:url", content: meta.canonicalUrl },
    { property: "og:image", content: meta.ogImage },
    { property: "og:image:secure_url", content: meta.ogImage },
    { property: "og:image:alt", content: meta.ogImageAlt },
    { property: "og:image:width", content: String(meta.ogImageWidth) },
    { property: "og:image:height", content: String(meta.ogImageHeight) },
    { property: "og:image:type", content: meta.ogImageType },
    { property: "og:site_name", content: SITE_NAME },
  ];

  nameTags.forEach((t) => {
    const el = document.createElement("meta");
    el.name = t.name;
    el.content = t.content;
    document.head.appendChild(el);
  });

  propertyTags.forEach((t) => {
    const el = document.createElement("meta");
    el.setAttribute("property", t.property);
    el.content = t.content;
    document.head.appendChild(el);
  });

  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = meta.canonicalUrl;
  document.head.appendChild(canonical);
}