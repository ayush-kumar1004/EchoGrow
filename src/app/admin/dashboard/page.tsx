import { verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/sections/AdminDashboardClient";
import { logoutAdminAction } from "@/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isAuthorized = await verifyAdminSession();
  if (!isAuthorized) {
    redirect("/login");
  }

  // Fetch leads and subscribers from DB ordered by newest first
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const subscribers = await prisma.subscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <AdminDashboardClient
        initialLeads={leads}
        initialSubscribers={subscribers}
        onLogout={logoutAdminAction}
      />
    </div>
  );
}
