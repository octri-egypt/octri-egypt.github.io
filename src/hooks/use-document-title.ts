import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateMetadata, injectMetadata } from "@/lib/seo";

export function useDocumentTitle(title?: string, description?: string) {
  const location = useLocation();

  useEffect(() => {
    const meta = generateMetadata({ title, description, path: location.pathname });
    document.title = meta.title;
    injectMetadata(meta);
  }, [title, description, location.pathname]);
}