'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  lastName: string;
  firstName: string;
  middleName?: string;
  groupId: number;
}

interface AddStudentProps {
  onAdd: (data: FormData) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Фамилия</label>
        <input {...register('lastName', { required: 'Обязательное поле' })} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>
      <div>
        <label>Имя</label>
        <input {...register('firstName', { required: 'Обязательное поле' })} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>
      <div>
        <label>Отчество</label>
        <input {...register('middleName')} />
      </div>
      <div>
        <label>Группа (ID)</label>
        <input type="number" {...register('groupId', { required: 'Обязательное поле', valueAsNumber: true })} />
        {errors.groupId && <span>{errors.groupId.message}</span>}
      </div>
      <button type="submit">Добавить студента</button>
    </form>
  );
};

export default AddStudent;