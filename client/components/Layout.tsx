import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
