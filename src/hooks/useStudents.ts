import { useQuery } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
}

const fetchStudents = async (): Promise<StudentInterface[]> => {
  const res = await fetch('/api/students');
  if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status} ${res.statusText}`);
  return res.json();
};

const useStudents = (): StudentsHookInterface => {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    // enabled: false, // не блокируем запрос, запускается автоматически
  });

  return {
    students: data ?? [],
  };
};

export default useStudents;
