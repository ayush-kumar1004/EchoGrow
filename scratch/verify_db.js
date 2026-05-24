const { PrismaClient } = require('@prisma/client');

async function main() {
  const args = process.argv.slice(2);
  const action = args[0]; // 'verify-subscriber', 'verify-lead', 'cleanup'
  const targetEmail = args[1];

  const prisma = new PrismaClient();

  try {
    if (action === 'verify-subscriber') {
      console.log(`Verifying subscriber with email: ${targetEmail}`);
      const sub = await prisma.subscriber.findUnique({
        where: { email: targetEmail }
      });
      if (sub) {
        console.log(JSON.stringify({ found: true, id: sub.id }));
        process.exit(0);
      } else {
        console.log(JSON.stringify({ found: false }));
        process.exit(1);
      }
    } else if (action === 'verify-lead') {
      console.log(`Verifying lead with email: ${targetEmail}`);
      const lead = await prisma.lead.findFirst({
        where: { email: targetEmail },
        orderBy: { createdAt: 'desc' }
      });
      if (lead) {
        console.log(JSON.stringify({
          found: true,
          id: lead.id,
          businessName: lead.businessName,
          contactName: lead.contactName,
          services: lead.services,
          goals: lead.goals,
          status: lead.status,
          notes: lead.notes
        }));
        process.exit(0);
      } else {
        console.log(JSON.stringify({ found: false }));
        process.exit(1);
      }
    } else if (action === 'cleanup') {
      console.log(`Cleaning up test data with pattern containing: ${targetEmail}`);
      const deletedLeads = await prisma.lead.deleteMany({
        where: {
          email: {
            contains: targetEmail
          }
        }
      });
      const deletedSubs = await prisma.subscriber.deleteMany({
        where: {
          email: {
            contains: targetEmail
          }
        }
      });
      console.log(JSON.stringify({ success: true, deletedLeadsCount: deletedLeads.count, deletedSubsCount: deletedSubs.count }));
      process.exit(0);
    } else {
      console.error("Unknown action. Use 'verify-subscriber', 'verify-lead', or 'cleanup'.");
      process.exit(2);
    }
  } catch (error) {
    console.error("Database check failed:", error);
    process.exit(3);
  } finally {
    await prisma.$disconnect();
  }
}

main();
