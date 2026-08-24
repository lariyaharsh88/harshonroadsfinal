import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";

export default async function AdminCmsLayout({
  children,
}: LayoutProps<"/admin">) {
  await requireAdmin();

  return <AdminShell>{children}</AdminShell>;
}
