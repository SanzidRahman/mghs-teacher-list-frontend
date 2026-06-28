// components/QuickLinks.tsx

import Link from "next/link";

const sections = [
    {
        title: "অভ্যন্তরীণ ই-সেবা",
        links: [
            { label: "SIB শিক্ষার্থী ডেটাবেজ", href: "http://automation.sib.gov.bd" },
            { label: "পিডিএস (সরকারি মাধ্যমিক)", href: "http://pds.sib.gov.bd" },
            { label: "ভর্তি পরীক্ষার আবেদন", href: "https://gsa.teletalk.com.bd" },
        ],
    },
    {
        title: "গুরুত্বপূর্ণ লিংক",
        links: [
            { label: "শিক্ষা মন্ত্রণালয়", href: "https://www.dshe.gov.bd" },
            { label: "মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর", href: "https://shed.gov.bd" },
            { label: "ব্যানবেইজ", href: "https://banbeis.gov.bd" },
            { label: "নায়েম", href: "https://naem.gov.bd" },
            { label: "এনসিটিবি", href: "https://nctb.gov.bd" },
            { label: "শিক্ষক বাতায়ন", href: "https://www.teachers.gov.bd" },
            { label: "কিশোর বাতায়ন", href: "https://www.konnect.edu.bd" },
        ],
    },
    {
        title: "ওয়েবমেইল",
        links: [
            { label: "ওয়েবমেইল লগইন", href: "#" },
        ],
    },
];

const QuickLinks = () => {
    return (
        <div className="bg-white border border-gray-300">
            {sections.map((section, index) => (
                <div key={index} className={index !== 0 ? "mt-4" : ""}>
                    {/* Section Header */}
                    <div className="bg-sky-500 text-white font-bold px-3 py-2 text-sm">
                        {section.title}
                    </div>

                    {/* Links */}
                    <div className="px-3 py-2">
                        {section.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-2 py-2 text-[15px] font-semibold text-black hover:text-red-600 border-b border-dashed border-gray-300 transition-colors"
                            >
                                <span className="text-orange-500 text-lg leading-none">
                                    ›
                                </span>

                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuickLinks;