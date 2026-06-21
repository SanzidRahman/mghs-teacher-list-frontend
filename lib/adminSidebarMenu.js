import { RiCoupon2Line } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { ADMIN_TEACHER_ADD, ADMIN_TEACHER_SHOW } from "./AdminPanelRoute";
// import { BiCategory } from "react-icons/bi";
// import { IoShirtOutline } from "react-icons/io5";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { LuUserRound } from "react-icons/lu";
// import { IoMdStarOutline } from "react-icons/io";
// import { MdOutlinePermMedia } from "react-icons/md";



export const AdminSidebarMenu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: AiOutlineDashboard,
  },


  {
    title: "Teacher",
    href: "#",
    icon: LiaChalkboardTeacherSolid,
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


];
