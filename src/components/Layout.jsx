import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="h-auto">
      <Navbar />
      <main className="min-h-screen max-h-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
