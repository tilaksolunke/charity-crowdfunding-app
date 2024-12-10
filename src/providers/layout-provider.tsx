"use client";
import { getCurrentUserDataFromMongoDB } from "@/actions/users";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [menuToshow, setMenuToshow] = React.useState<any>([]);
  const pathname = usePathname();
  const router = useRouter();

  const userMenu = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Donations",
      url: "/donations",
    },
  ];
  const adminMenu = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
    },
    {
      name: "Donations",
      url: "/admin/donations",
    },
    {
      name: "Campaigns",
      url: "/admin/campaigns",
    },
    {
      name: "Users",
      url: "/admin/users",
    },
  ];

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserDataFromMongoDB();
      if (response.error) throw new Error(response.error);
      setCurrentUser(response.data);
      if (response.data?.isAdmin) {
        setMenuToshow(adminMenu);
      } else {
        setMenuToshow(userMenu);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const getHeader = () => {
    // if the route sign-in or sign-up, don't show header
    if (pathname.includes("/sign-in") || pathname.includes("/sign-up"))
      return null;
    return (
      <div className="p-3 bg-primary flex justify-between items-center">
        <h1 className="font-semibold text-xl text-white cursor-pointer"
        onClick={() => router.push("/")}
        >NextChange</h1>
        <div className="bg-white rounded py-2 px-3 flex items-center gap-5">
          <Dropdown
            menu={{
              items: menuToshow.map((menu: any) => ({
                key: menu.name,
                label: menu.name,
                onClick: () => {
                  router.push(menu.url);
                },
              })),
            }}
          >
            <Button type="link">{currentUser?.userName}</Button>
          </Dropdown>
          <UserButton afterSwitchSessionUrl="/sign-in" />
        </div>
      </div>
    );
  };
  const getContent = () => {}

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div>
      {getHeader()}
      {/* {getContent()} */}
      {children}
    </div>
  );
}

export default LayoutProvider;
