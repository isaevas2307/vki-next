import { getStudentsDb } from '@/db/studentDb';
import { addStudentDb } from '@/db/studentDb'; 
import { type NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const student = await req.json();
    if (!student.firstName || !student.lastName || typeof student.groupId !== 'number') {
      return new Response(
        JSON.stringify({ error: 'firstName, lastName и groupId (число) обязательны' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const newStudent = await addStudentDb(student);
    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('>>> POST /api/students error:', err);
    return new Response(
      JSON.stringify({ error: 'Ошибка при добавлении студента' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}