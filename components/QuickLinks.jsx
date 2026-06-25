// components/QuickLinks.tsx
import Link from "next/link";

const QuickLinks = () => {
    const links = [
        { label: "Online Admission", icon: "🎓", href: "/admission" },
        { label: "Result Archive", icon: "📊", href: "/results" },
        { label: "Academic Calendar", icon: "📅", href: "/calendar" },
        { label: "Download Forms", icon: "📄", href: "/forms" },
        { label: "Library", icon: "📚", href: "/library" },
        { label: "Contact Us", icon: "📞", href: "/contact" },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 px-4 py-3">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <span>⚡</span> Quick Links
                </h2>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickLinks;