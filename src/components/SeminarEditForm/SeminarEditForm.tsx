import { FormEvent, useState } from "react";
import { formatDateForInput, formatDateForServer } from "../../utils/helpers";
import { Seminar } from "../../utils/interfaces";
import styles from "./SeminarEditForm.module.css";

interface SeminarEditFormProps {
  seminar: Seminar;
  onSubmit: (updatedSeminar: Seminar) => void;
  loading: boolean;
}

export default function SeminarEditForm({
  seminar,
  onSubmit,
  loading,
}: SeminarEditFormProps) {
  const [formData, setFormData] = useState<Seminar>({
    ...seminar,
    date: formatDateForInput(seminar.date),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submittedData = {
      ...formData,
      date: formatDateForServer(formData.date),
    };

    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Название семинара</label>
        <input
          className={styles.input}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Описание</label>
        <textarea
          className={styles.textarea}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Дата</label>
          <input
            className={styles.input}
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Время</label>
          <input
            className={styles.input}
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="photo">Ссылка на фото</label>
        <input
          className={styles.input}
          type="url"
          id="photo"
          name="photo"
          value={formData.photo}
          onChange={handleInputChange}
          placeholder="Введите URL изображения"
          required
        />
      </div>

      <button type="submit" className="confirm-btn">
        {loading ? (
          <img
            className={styles.smallLoader}
            src="/loader.gif"
            alt="Загрузка..."
          />
        ) : (
          "Сохранить"
        )}
      </button>
    </form>
  );
}
