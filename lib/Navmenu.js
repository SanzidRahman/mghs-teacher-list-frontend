import { ADMIN_DASHBOARD, WEBSITE_LOGIN } from "./AdminPanelRoute";

export const menus = [
    {
        title: "প্রথম পাতা",
        href: "/",
    },
    {
        title: "পরিচিতি",
        children: [
            { title: "বিদ্যালয়ের ইতিহাস", href: "/history" },
            { title: "এক নজরে পরিচিতি", href: "/ataglance" },
        ],
    },
    {
        title: "জনবল",
        children: [
            { title: "শিক্ষকবৃন্দ", href: "/all-teacher" },
            { title: "কর্মচারীবৃন্দ", href: "/staffs" },
        ],
    },
    {
        title: "পরীক্ষার ফলাফল",
        children: [
            { title: "পাবলিক পরীক্ষার ফলাফল", href: "/public-result" },
            { title: "বিদ্যালয়ের অভ্যন্তরীণ পরীক্ষার ফলাফল", href: "/internal-result" },

        ],
    },
    {
        title: "শিক্ষার্থী",
        children: [
            { title: "অধ্যয়নরত শিক্ষার্থীর তালিকা", href: "/all-students-data" },
            { title: "অধ্যয়নরত শিক্ষার্থীর সংখ্যা", href: "/all-studence" },
            { title: "শ্রেণী রুটিন", href: "/routine" },
            { title: "উপস্থিতি", href: "/attendence" },
        ],
    },

    {
        title: "ছবির গ্যালারি",
        href: "/gallery",
    },

    {
        title: "নোটিশ",
        href: "/notice",
    },
    {
        title: "এডমিন",
        href: WEBSITE_LOGIN,
    },
];