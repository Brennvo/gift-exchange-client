import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => (
  <>
    <NavBar />
    <main>
      <div style={{ padding: "0 10px", maxWidth: "1200px", margin: "0 auto" }}>
        {children}
      </div>
    </main>
    <Footer />
  </>
);

export default LayoutWrapper;
