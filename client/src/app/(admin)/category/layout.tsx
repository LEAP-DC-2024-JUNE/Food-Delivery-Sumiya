import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSideBar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
