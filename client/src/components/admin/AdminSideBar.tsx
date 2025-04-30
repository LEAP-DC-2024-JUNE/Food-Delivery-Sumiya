"use client";
import { Sidebar, SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import { AdminLogo } from "../svgs/AdminLogo";
import { FoodMenuLogo } from "../svgs/sidebar/FoodMenuLogo";
import { OrdersLogo } from "../svgs/sidebar/OrdersLogo";
import { usePathname } from "next/navigation";
import Link from "next/link";
export function AdminSideBar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent className="px-5 mt-9">
        <AdminLogo />
        <SidebarMenu>
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex gap-[10px] items-center">
              <FoodMenuLogo />
              <Link
                href="/category"
                style={{
                  backgroundColor: pathname === "/category" ? "black" : "",
                  color: pathname === "/category" ? "white" : "",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                FoodMenu
              </Link>
            </div>
            <div className="flex gap-[10px] items-center">
              <OrdersLogo />
              <Link
                href="/orders"
                style={{
                  backgroundColor: pathname === "/orders" ? "black" : "",
                  color: pathname === "/orders" ? "white" : "",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Orders
              </Link>
            </div>
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
