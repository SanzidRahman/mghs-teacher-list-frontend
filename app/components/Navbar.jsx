import React from "react";
import { NavbarItems } from "../utils/NavbarItems";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-12 w-full bg-linear-to-r from-emerald-500 to-emerald-900 text-white flex justify-center items-center gap-10">
      {NavbarItems.map((item, index) => (
        <div key={index}>
          <Link href={item.href}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
