import { useEffect } from "react";
import { Link, Outlet, useLocation, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StructuredData } from "./components/StructuredData";

function ErrorView() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Something went wrong.";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-3xl mb-2">Something went wrong</h1>
        <p className="text-muted-foreground text-sm mb-6">{message}</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-semibold"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const error = useRouteError();

  // Scroll to top on navigation (excluding hash anchors).
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData />
      <Header />
      <main className="flex-1">{error ? <ErrorView /> : <Outlet />}</main>
      <Footer />
    </div>
  );
}
