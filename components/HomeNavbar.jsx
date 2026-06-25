import { menus } from '@/lib/Navmenu'
import Link from 'next/link'
import React from 'react'

const HomeNavbar = () => {
    return (
        <section className="bg-white shadow">
            <div className="max-w-7xl mx-auto p-4">
                <nav className="bg-white border-y shadow-sm">
                    <div className="max-w-7xl mx-auto">

                        <ul className="flex items-center">
                            {menus.map((menu, index) => (
                                <li key={index} className="relative group">
                                    {menu.children ? (
                                        <>
                                            {/* Parent Menu Button */}
                                            <button className="px-6 py-4 font-medium hover:bg-blue-600 hover:text-white transition">
                                                {menu.title}
                                            </button>

                                            {/* Dropdown */}
                                            <div
                                                className="absolute left-0 top-full z-50 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200
                "
                                            >
                                                <ul className="w-64 bg-white border shadow-lg">
                                                    {menu.children.map((child, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={child.href}
                                                                className="block px-4 py-3 border-b last:border-b-0 hover:bg-blue-50"
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
                </nav>
            </div>
        </section>
    )
}

export default HomeNavbar