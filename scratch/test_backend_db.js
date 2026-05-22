const { PrismaClient } = require('@prisma/client');

async function runTest() {
  const prisma = new PrismaClient();
  console.log("Checking backend SQLite database connection...");

  try {
    // 1. Create a test lead
    console.log("Testing Lead insertion...");
    const testLead = await prisma.lead.create({
      data: {
        businessName: "Test Backend Business",
        contactName: "Backend Tester",
        email: "backend-test@example.com",
        businessType: "Technology",
        services: "Analytics, Audio",
        goals: "Verify that Prisma client successfully writes to SQLite.",
      }
    });
    console.log("✓ Lead inserted successfully. ID:", testLead.id);

    // 2. Query the lead
    console.log("Testing Lead retrieval...");
    const retrievedLead = await prisma.lead.findUnique({
      where: { id: testLead.id }
    });
    if (retrievedLead && retrievedLead.businessName === "Test Backend Business") {
      console.log("✓ Lead retrieved and verified successfully.");
    } else {
      throw new Error("Failed to retrieve or verify the inserted Lead.");
    }

    // 3. Create/Upsert a subscriber
    console.log("Testing Subscriber upsert...");
    const testSub = await prisma.subscriber.upsert({
      where: { email: "backend-test-sub@example.com" },
      update: {},
      create: { email: "backend-test-sub@example.com" }
    });
    console.log("✓ Subscriber upserted successfully. ID:", testSub.id);

    // 4. Delete the test data (cleanup)
    console.log("Cleaning up test data...");
    await prisma.lead.delete({
      where: { id: testLead.id }
    });
    await prisma.subscriber.delete({
      where: { email: "backend-test-sub@example.com" }
    });
    console.log("✓ Cleanup finished successfully.");
    console.log("\n====== DATABASE BACKEND WORKED PERFECTLY! ======");
  } catch (error) {
    console.error("❌ Backend Database Test Failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
