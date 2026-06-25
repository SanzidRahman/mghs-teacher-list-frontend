export const menus = [
    {
        title: "প্রথম পাতা",
        href: "/",
    },
    {
        title: "পরিচিতি",
        children: [
            { title: "বিদ্যালয়ের ইতিহাস", href: "/history" },
            { title: "লক্ষ্য ও উদ্দেশ্য", href: "/mission" },
            { title: "অবকাঠামো", href: "/infrastructure" },
        ],
    },
    {
        title: "জনবল",
        children: [
            { title: "শিক্ষকবৃন্দ", href: "/teachers" },
            { title: "কর্মচারীবৃন্দ", href: "/staffs" },
        ],
    },
    {
        title: "শিক্ষার্থী",
        children: [
            { title: "ভর্তি তথ্য", href: "/admission" },
            { title: "শ্রেণি রুটিন", href: "/routine" },
            { title: "উপস্থিতি", href: "/attendance" },
        ],
    },
    {
        title: "পরীক্ষার ফলাফল",
        href: "/results",
    },
    {
        title: "ছবির গ্যালারি",
        href: "/gallery",
    },
    {
        title: "যোগাযোগ",
        href: "/contact",
    },
];