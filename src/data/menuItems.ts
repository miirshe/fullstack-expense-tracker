import { RiDashboardLine } from "react-icons/ri";
import { FiGrid } from "react-icons/fi";

import { BiTransferAlt } from "react-icons/bi";

export const menuItems = [
  {
    icon: RiDashboardLine,
    text: "Dashboard",
    url: "/dashboard" || "/",
    submenus: [],
  },

  {
    icon: FiGrid,
    text: "Category",
    url: "/dashboard/category",
    submenus: [],
  },
  {
    icon: BiTransferAlt,
    text: "Transaction",
    url: "/dashboard/transaction",
    submenus: [],
  },
];
