import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/index";
import About from "./routes/about";
import Services from "./routes/services";
import Schedule from "./routes/schedule";
import Contact from "./routes/contact";
import Offers from "./routes/offers";
import Partners from "./routes/partners";
import Achievements from "./routes/achievements";
import Events from "./routes/events";
import Fitness from "./routes/fitness";
import NotFound from "./routes/not-found";
import "./styles.css";

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("SW registered:", registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check every hour

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New version available, notify user
                console.log("New version available!");
                // Could dispatch a custom event here for a toast notification
                window.dispatchEvent(new CustomEvent("sw-update-available"));
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "schedule", element: <Schedule /> },
      { path: "offers", element: <Offers /> },
      { path: "partners", element: <Partners /> },
      { path: "achievements", element: <Achievements /> },
      { path: "events", element: <Events /> },
      { path: "fitness", element: <Fitness /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);