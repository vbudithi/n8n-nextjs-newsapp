"use client";
import React from "react";
import HideOnScrollNavbar from "./HideOnScrollNavbar";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow">
      <HideOnScrollNavbar />
    </header>
  );
}
