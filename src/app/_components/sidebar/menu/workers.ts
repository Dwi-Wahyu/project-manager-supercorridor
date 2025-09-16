import { IconClockCog, IconUserScreen } from "@tabler/icons-react";

import { HouseWifi, LayoutDashboard, Waypoints } from "lucide-react";

export const workersMenu = {
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
  ],
};
