"use client";

import { menus } from "@/lib/Navmenu";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const HomeNavbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        if (openDropdown === index) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(index);
        }
    };

    return (
        <section className="bg-white shadow">
            <div className="max-w-7xl mx-auto">
                <nav className="border-y bg-white">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-4 lg:px-0">
                        {/* Mobile Button */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="lg:hidden py-4"
                        >
                            {mobileMenu ? (
                                <X size={28} />
                            ) : (
                                <Menu size={28} />
                            )}
                        </button>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center">
                            {menus.map((menu, index) => (
                                <li key={index} className="relative group">
                                    {menu.children ? (
                                        <>
                                            <button className="flex items-center gap-1 px-6 py-4 font-medium hover:bg-blue-600 hover:text-white transition">
                                                {menu.title}
                                                <ChevronDown size={16} />
                                            </button>

                                            <div
                                                className="absolute left-0 top-full z-50 invisible opacity-0 translate-y-2 group-hover:visible     group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                            >
                                                <ul className="w-64 bg-white border shadow-lg">
                                                    {menu.children.map((child, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={child.href}
                                                                className="block px-5 py-3 border-b last:border-b-0 hover:bg-blue-50"
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={menu.href}
                                            className="block px-6 py-4 font-medium hover:bg-blue-600 hover:text-white transition"
                                        >
                                            {menu.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenu ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <ul className="border-t">
                            {menus.map((menu, index) => (
                                <li key={index} className="border-b">
                                    {menu.children ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="w-full flex justify-between items-center px-4 py-4 font-medium"
                                            >
                                                {menu.title}

                                                {openDropdown === index ? (
                                                    <ChevronUp size={18} />
                                                ) : (
                                                    <ChevronDown size={18} />
                                                )}
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${openDropdown === index
                                                    ? "max-h-96"
                                                    : "max-h-0"
                                                    }`}
                                            >
                                                {menu.children.map((child, i) => (
                                                    <Link
                                                        key={i}
                                                        href={child.href}
                                                        onClick={() => setMobileMenu(false)}
                                                        className="block bg-gray-50 px-8 py-3 border-t hover:bg-blue-50"
                                                    >
                                                        {child.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={menu.href}
                                            onClick={() => setMobileMenu(false)}
                                            className="block px-4 py-4 font-medium hover:bg-blue-50"
                                        >
                                            {menu.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default HomeNavbar;