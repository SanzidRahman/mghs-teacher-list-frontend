import { AiOutlineDashboard } from "react-icons/ai";
import { ADMIN_AT_A_GLANCE_ADD, ADMIN_AT_A_GLANCE_SHOW, ADMIN_STUDENT_ADD, ADMIN_STUDENT_SHOW, ADMIN_TEACHER_ADD, ADMIN_TEACHER_SHOW, ADMIN_UPLOADFILE_ADD, ADMIN_UPLOADFILE_SHOW, ADMIN_UPLOADNEWS_ADD, ADMIN_UPLOADNEWS_SHOW } from "./AdminPanelRoute";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa";
import { FaArrowsToEye } from "react-icons/fa6";
import { FaRegNoteSticky } from "react-icons/fa6";

export const AdminSidebarMenu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: AiOutlineDashboard,
  },


  {
    title: "Teacher",
    href: "#",
    icon: FaChalkboardTeacher,
    submenu: [
      {
        title: "Add-Teacher",
        href: ADMIN_TEACHER_ADD,
      },
      {
        title: "All-Teacher",
        href: ADMIN_TEACHER_SHOW,
      },
    ],
  },
  {
    title: "Student",
    href: "#",
    icon: PiStudent,
    submenu: [
      {
        title: "Add-Student",
        href: ADMIN_STUDENT_ADD,
      },
      {
        title: "All-Student",
        href: ADMIN_STUDENT_SHOW,
      },
    ],
  },

  {
    title: "Notice",
    href: "#",
    icon: FaRegNoteSticky,
    submenu: [
      {
        title: "Notice-Add",
        href: ADMIN_UPLOADFILE_ADD,
      },
      {
        title: "All-Notice",
        href: ADMIN_UPLOADFILE_SHOW,
      },
    ],
  },

  {
    title: "News",
    href: "#",
    icon: FaRegNewspaper,
    submenu: [
      {
        title: "News-Add",
        href: ADMIN_UPLOADNEWS_ADD,
      },
      {
        title: "All-News",
        href: ADMIN_UPLOADNEWS_SHOW,
      },
    ],
  },

  {
    title: "এক নজরে",
    href: "#",
    icon: FaArrowsToEye,
    submenu: [
      {
        title: "এক নজরে",
        href: ADMIN_AT_A_GLANCE_ADD,
      },
      {
        title: "Show",
        href: ADMIN_AT_A_GLANCE_SHOW,
      },
    ],
  },


];
