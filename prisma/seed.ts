import { PrismaClient, StudentStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const students = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@eduayna.com', phone: '+8801712345001', class: 'Grade 10', status: StudentStatus.ACTIVE },
  { name: 'Fatima Hassan', email: 'fatima.hassan@eduayna.com', phone: '+8801712345002', class: 'Grade 11', status: StudentStatus.ACTIVE },
  { name: 'Rihan Ahmed', email: 'rihan.ahmed@eduayna.com', phone: '+8801712345003', class: 'Grade 9', status: StudentStatus.ACTIVE },
  { name: 'Sneha Patel', email: 'sneha.patel@eduayna.com', phone: '+8801712345004', class: 'Grade 12', status: StudentStatus.INACTIVE },
  { name: 'Omar Faruk', email: 'omar.faruk@eduayna.com', phone: '+8801712345005', class: 'Grade 10', status: StudentStatus.ACTIVE },
  { name: 'Ananya Dey', email: 'ananya.dey@eduayna.com', phone: '+8801712345006', class: 'Grade 11', status: StudentStatus.ACTIVE },
  { name: 'Kabir Hossain', email: 'kabir.hossain@eduayna.com', phone: '+8801712345007', class: 'Grade 9', status: StudentStatus.INACTIVE },
  { name: 'Priya Nair', email: 'priya.nair@eduayna.com', phone: '+8801712345008', class: 'Grade 12', status: StudentStatus.ACTIVE },
  { name: 'Tanvir Rahman', email: 'tanvir.rahman@eduayna.com', phone: '+8801712345009', class: 'Grade 10', status: StudentStatus.ACTIVE },
  { name: 'Ishita Roy', email: 'ishita.roy@eduayna.com', phone: '+8801712345010', class: 'Grade 11', status: StudentStatus.ACTIVE },
  { name: 'Zain Ali', email: 'zain.ali@eduayna.com', phone: '+8801712345011', class: 'Grade 9', status: StudentStatus.INACTIVE },
  { name: 'Meher Sultana', email: 'meher.sultana@eduayna.com', phone: '+8801712345012', class: 'Grade 12', status: StudentStatus.ACTIVE },
  { name: 'Arjun Biswas', email: 'arjun.biswas@eduayna.com', phone: '+8801712345013', class: 'Grade 10', status: StudentStatus.ACTIVE },
  { name: 'Nusrat Jahan', email: 'nusrat.jahan@eduayna.com', phone: '+8801712345014', class: 'Grade 11', status: StudentStatus.ACTIVE },
  { name: 'Rafiq Uddin', email: 'rafiq.uddin@eduayna.com', phone: '+8801712345015', class: 'Grade 9', status: StudentStatus.ACTIVE },
  { name: 'Diya Chakraborty', email: 'diya.chakraborty@eduayna.com', phone: '+8801712345016', class: 'Grade 12', status: StudentStatus.INACTIVE },
  { name: 'Sami Karim', email: 'sami.karim@eduayna.com', phone: '+8801712345017', class: 'Grade 10', status: StudentStatus.ACTIVE },
  { name: 'Aisha Begum', email: 'aisha.begum@eduayna.com', phone: '+8801712345018', class: 'Grade 11', status: StudentStatus.ACTIVE },
  { name: 'Rayhan Miah', email: 'rayhan.miah@eduayna.com', phone: '+8801712345019', class: 'Grade 9', status: StudentStatus.ACTIVE },
  { name: 'Tania Akter', email: 'tania.akter@eduayna.com', phone: '+8801712345020', class: 'Grade 12', status: StudentStatus.ACTIVE },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.student.deleteMany();

  // Create students
  for (const student of students) {
    await prisma.student.create({ data: student });
  }

  console.log(`✅ Seeded ${students.length} students`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
