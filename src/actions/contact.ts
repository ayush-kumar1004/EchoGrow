"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ContactSchema = z.object({
  businessName: z.string().default("Not provided"),
  contactName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  businessType: z.string().optional(),
  services: z.string().optional(),
  goals: z.string().optional(),
});

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      businessName: formData.get("business-name") as string || formData.get("businessName") as string || "Not provided",
      contactName: formData.get("contact-name") as string || formData.get("contactName") as string || "",
      email: formData.get("email") as string || "",
      businessType: formData.get("business-type") as string || formData.get("businessType") as string || "",
      services: formData.getAll("services").join(", "),
      goals: formData.get("goals") as string || "",
    };

    const validatedData = ContactSchema.parse(rawData);

    await prisma.lead.create({
      data: validatedData,
    });

    // TODO: Integrate Resend or SendGrid here in the future
    // await sendEmailNotification(validatedData);

    return { success: true, message: "Thank you! Your request has been received." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function subscribeEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const validatedData = SubscribeSchema.parse({ email });

    await prisma.subscriber.upsert({
      where: { email: validatedData.email },
      update: {},
      create: { email: validatedData.email },
    });

    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

const PortfolioInquirySchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
});

export async function submitPortfolioInquiry(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const message = formData.get("message") as string || "";
    
    const validatedData = PortfolioInquirySchema.parse({ email, message });

    // Save inquiry to the Lead table
    await prisma.lead.create({
      data: {
        businessName: "Portfolio Inquiry",
        contactName: "Portfolio Visitor",
        email: validatedData.email,
        goals: validatedData.message || "No message provided",
      },
    });

    // Also add to Subscriber table for newsletter/updates
    try {
      await prisma.subscriber.upsert({
        where: { email: validatedData.email },
        update: {},
        create: { email: validatedData.email },
      });
    } catch {
      // Ignore failures to save to subscriber table if lead succeeded
    }

    return { success: true, message: "Thank you for your inquiry." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

