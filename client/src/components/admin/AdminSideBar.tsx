import { Sidebar, SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import { AdminLogo } from "../svgs/AdminLogo";
import { FoodMenuLogo } from "../svgs/sidebar/FoodMenuLogo";
import { OrdersLogo } from "../svgs/sidebar/OrdersLogo";
import { SettingsLogo } from "../svgs/sidebar/SettingsLogo";
export function AdminSideBar() {
  return (
    <Sidebar>
      <SidebarContent className="px-5 mt-9">
        <AdminLogo />
        <SidebarMenu>
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex gap-[10px]">
              <FoodMenuLogo />
              <p>FoodMenu</p>
            </div>
            <div className="flex gap-[10px]">
              <OrdersLogo />
              <p>Orders</p>
            </div>
            <div className="flex gap-[10px]">
              <SettingsLogo />
              <p>Settings</p>
            </div>
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
