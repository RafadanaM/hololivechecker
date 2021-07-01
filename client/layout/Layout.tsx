import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
