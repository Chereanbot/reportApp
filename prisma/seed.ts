import { PrismaClient, ReportStatus, ReportType, Role, SpecificReportType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.report.deleteMany()
  await prisma.user.deleteMany()

  // Create admin users with password 'cherean'
  const hashedPassword = await bcrypt.hash('cherean', 10)
  
  const admin1 = await prisma.user.create({
    data: {
      email: 'cherean@admin.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN
    }
  })

  const admin2 = await prisma.user.create({
    data: {
      email: 'admin2@admin.com',
      name: 'Second Admin',
      password: hashedPassword,
      role: Role.ADMIN
    }
  })

  // Create regular users
  const users = await Promise.all(
    Array.from({ length: 8 }).map(async (_, i) => {
      return prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          name: `User ${i + 1}`,
          password: await bcrypt.hash('password123', 10),
          role: Role.USER
        }
      })
    })
  )

  // Create sample reports
  const reports = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const isEmergency = i % 2 === 0
      const randomStatus = Object.values(ReportStatus)[Math.floor(Math.random() * 4)]
      
      return prisma.report.create({
        data: {
          reportId: `REP${String(i + 1).padStart(3, '0')}`,
          type: isEmergency ? ReportType.EMERGENCY : ReportType.NON_EMERGENCY,
          title: isEmergency ? `Emergency Report ${i + 1}` : `Non-Emergency Report ${i + 1}`,
          description: `This is a ${isEmergency ? 'critical' : 'non-critical'} incident report number ${i + 1}. ${
            isEmergency 
              ? 'Immediate attention required.' 
              : 'Please review when possible.'
          }`,
          specificType: isEmergency ? SpecificReportType.VIOLENCE : SpecificReportType.SUSPICIOUS_ACTIVITY,
          location: `Location ${i + 1}, City Area`,
          latitude: 9.0 + Math.random() * 0.5, // Random coordinates around Ethiopia
          longitude: 38.7 + Math.random() * 0.5,
          image: i % 3 === 0 ? 'https://example.com/sample-image.jpg' : null,
          status: randomStatus,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
          updatedAt: new Date()
        }
      })
    })
  )

  console.log({
    admins: [admin1, admin2],
    users,
    reports
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 