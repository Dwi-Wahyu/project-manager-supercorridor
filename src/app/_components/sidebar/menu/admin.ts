import {
  IconBuildingWarehouse,
  IconChartDots3,
  IconHeartHandshake,
  IconUserCog,
  IconUserShield,
} from "@tabler/icons-react";

import { HouseWifi, LayoutDashboard, Settings } from "lucide-react";

export const adminMenu = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
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
  ],
  navProject: [
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
      icon: IconChartDots3,
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
  ],
  navUser: [
    {
      title: "Admin",
      url: "/admin/users/admin",
      icon: IconUserShield,
    },
    {
      title: "Pekerja Lapangan",
      url: "/admin/users/pekerja-lapangan",
      icon: IconUserCog,
    },
  ],
  navSetting: [
    {
      title: "Pengaturan Aplikasi",
      url: "/admin/pengaturan-aplikasi",
      icon: Settings,
    },
  ],
};
