import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayout {
  children: ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
