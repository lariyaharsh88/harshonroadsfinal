import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Container } from "@/components/ui/Container";
import { isAdminConfigured } from "@/lib/admin/config";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <Container className="py-16">
      {!isAdminConfigured() ? (
        <p className="mx-auto mb-6 max-w-md rounded-2xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm">
          Set <code className="font-mono">ADMIN_PASSWORD</code> and{" "}
          <code className="font-mono">ADMIN_SESSION_SECRET</code> in your{" "}
          <code className="font-mono">.env.local</code> file before signing in.
        </p>
      ) : null}
      <AdminLoginForm nextPath={nextPath} />
    </Container>
  );
}
