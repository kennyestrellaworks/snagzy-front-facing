import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <header className="sticky top-0 z-50 w-full header-nav">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
