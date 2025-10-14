import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows as StudentInterface[]);
      }
    });
  });
};

export const addStudentDb = async (student: any): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const { firstName, lastName, middleName, groupId } = student;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO student (firstName, lastName, middleName, groupId)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [firstName, lastName, middleName, groupId], function (err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }

      const getSql = 'SELECT * FROM student WHERE id = ?';
      db.get(getSql, [this.lastID], (err, row) => {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(row as StudentInterface);
        }
      });
    });
  });
};
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM student WHERE id = ?', [studentId], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          reject(new Error('Студент не найден'));
        } else {
          resolve(studentId);
        }
      }
    });
  });
};