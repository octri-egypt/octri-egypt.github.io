import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function NotFound() {
  useDocumentTitle("Page Not Found", "The page you're looking for doesn't exist. Return to OCTRI Egypt homepage for triathlon training programs, schedules, and community.");

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-8xl text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
