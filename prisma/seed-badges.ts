import { PrismaClient, BadgeCategory, BadgeRarity } from "@prisma/client"
import { BADGE_DEFINITIONS } from "../lib/badges"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding badges...")

  for (const badgeDef of BADGE_DEFINITIONS) {
    await prisma.badge.upsert({
      where: { slug: badgeDef.slug },
      update: {
        name: badgeDef.name,
        description: badgeDef.description,
        icon: badgeDef.icon,
        category: badgeDef.category,
        criteria: badgeDef.criteria,
        points: badgeDef.points,
        rarity: badgeDef.rarity,
        order: badgeDef.order,
        isActive: true,
      },
      create: {
        slug: badgeDef.slug,
        name: badgeDef.name,
        description: badgeDef.description,
        icon: badgeDef.icon,
        category: badgeDef.category,
        criteria: badgeDef.criteria,
        points: badgeDef.points,
        rarity: badgeDef.rarity,
        order: badgeDef.order,
        isActive: true,
      },
    })

    console.log(`✅ Badge: ${badgeDef.name}`)
  }

  console.log(`\n🎉 Seeded ${BADGE_DEFINITIONS.length} badges successfully!`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding badges:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
