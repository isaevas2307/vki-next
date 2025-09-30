import Students from '@/components/Students/Students';
import Page from '@/components/layout/Page/Page';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студенты - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Список студентов с загрузкой из БД через TanStack Query',
};

const StudentsPage = (): React.ReactNode => (
  <Page>
    <h1>Студенты</h1>
    <Students />
  </Page>
);

export default StudentsPage;
