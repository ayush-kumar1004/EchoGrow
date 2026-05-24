"use server";

import { loginAdmin, logoutAdmin, verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Auth guard helper for server actions
async function checkAuth() {
  const isAuthorized = await verifyAdminSession();
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdminAction(
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password." };
  }

  const isSuccess = await loginAdmin(username, password);
  if (isSuccess) {
    redirect("/admin/dashboard");
  } else {
    return { success: false, error: "Invalid username or password." };
  }
}

export async function logoutAdminAction() {
  await logoutAdmin();
  redirect("/login");
}

export async function updateLeadStatusAction(leadId: string, status: string) {
  try {
    await checkAuth();
    await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Status updated successfully." };
  } catch (error: any) {
    console.error("Failed to update status:", error);
    return { success: false, message: error.message || "Failed to update status." };
  }
}

export async function updateLeadNotesAction(leadId: string, notes: string) {
  try {
    await checkAuth();
    await prisma.lead.update({
      where: { id: leadId },
      data: { notes },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Notes updated successfully." };
  } catch (error: any) {
    console.error("Failed to update notes:", error);
    return { success: false, message: error.message || "Failed to update notes." };
  }
}

export async function deleteLeadAction(leadId: string) {
  try {
    await checkAuth();
    await prisma.lead.delete({
      where: { id: leadId },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Lead deleted successfully." };
  } catch (error: any) {
    console.error("Failed to delete lead:", error);
    return { success: false, message: error.message || "Failed to delete lead." };
  }
}
