/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchHeroData } from "@/lib/store/heroSlice";
import { fetchContactData } from "@/lib/store/contactSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cpu,
  Settings,
  User,
  FolderOpen,
  Award,
  Mail,
  FileText,
  Home,
  Briefcase,
  BarChart3,
  Command,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/admin/dashboard",
    //   icon: User,
    // },
    {
      title: "Home",
      url: "/admin/home",
      icon: Home,
    },
    {
      title: "About",
      url: "/admin/about",
      icon: FolderOpen,
    },
    {
      title: "My Experience",
      url: "/admin/my-experience",
      icon: Settings,
    },
    {
      title: "Work Experience",
      url: "/admin/work-experience",
      icon: Award,
    },
    {
      title: "Skills",
      url: "/admin/skills",
      icon: FileText,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: Mail,
    },
    {
      title: "Certifications",
      url: "/admin/certifications",
      icon: Cpu,
    },
    {
      title: "Contact",
      url: "/admin/contact",
      icon: FileText,
    },
    {
      title: "Resume",
      url: "/admin/resume",
      icon: Briefcase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>();
  const heroName = useSelector((state: RootState) => state.hero.data?.name);
  const heroImageUrl = useSelector(
    (state: RootState) => state.hero.data?.imageUrl,
  );
  const contactEmail = useSelector(
    (state: RootState) => state.contact.data?.email,
  );

  useEffect(() => {
    dispatch(fetchHeroData());
    dispatch(fetchContactData());
  }, [dispatch]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4 pb-2">
        <div className="flex items-center gap-2 px-2 mb-4 group-data-[collapsible=icon]:hidden">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-lg tracking-tight">
              Admin Portal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 mb-4 hidden group-data-[collapsible=icon]:flex">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command className="size-5" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{
          name: heroName || "Admin",
          email: contactEmail || "Loading...",
          avatar: heroImageUrl || ""
        }} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
