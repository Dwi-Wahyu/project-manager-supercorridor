import {
  IconBuildingWarehouse,
  IconHeartHandshake,
  IconUserScreen,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Contact, HouseWifi, LayoutDashboard, Waypoints } from "lucide-react";

export const adminMenu = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "FTTH",
      url: "/admin/projects/ftth",
      icon: HouseWifi,
      child: [
        {
          title: "Summary",
          url: "/admin/projects/ftth/summary",
        },
        {
          title: "Detailed",
          url: "/admin/projects/ftth",
        },
      ],
    },
    {
      title: "Backbone",
      url: "/admin/projects/backbone",
      icon: Waypoints,
      child: [
        {
          title: "Summary",
          url: "/admin/projects/backbone/summary",
        },
        {
          title: "Detailed",
          url: "/admin/projects/backbone",
        },
      ],
    },
    {
      title: "Client",
      url: "/admin/clients",
      icon: IconHeartHandshake,
    },
    {
      title: "Material",
      url: "/admin/materials",
      icon: IconBuildingWarehouse,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUsersGroup,
      child: [
        {
          title: "Admin",
          url: "/admin/users/admin",
        },
        {
          title: "Pekerja Lapangan",
          url: "/admin/users/pekerja-lapangan",
        },
      ],
    },
  ],
};
