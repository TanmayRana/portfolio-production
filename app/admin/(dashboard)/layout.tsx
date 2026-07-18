import SidebarPage from "@/components/SidebarpageComponents/SidebarPage";
import ReduxProvider from "@/lib/store/ReduxProvider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <SidebarPage>
        <div className="flex-1 w-full flex flex-col overflow-hidden bg-background">
          <main className="flex-1 overflow-y-auto bg-muted/20">
            {children}
          </main>
        </div>
      </SidebarPage>
    </ReduxProvider>
  );
}
