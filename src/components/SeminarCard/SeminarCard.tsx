import { useState } from "react";
import { Seminar } from "../../utils/interfaces";
import styles from "./SeminarCard.module.css";

interface SeminarCardProps {
  seminar: Seminar;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function SeminarCard({
  seminar,
  onDelete,
  onUpdate,
}: SeminarCardProps) {
  const [imgSrc, setImgSrc] = useState(seminar.photo);

  // Подгрузка дефолтного изображения, в случае отсутствия изображения по указанному адресу
  const handleImageError = () => {
    setImgSrc("/no-image.jpg");
  };

  return (
    <>
      <div className={styles.card}>
        <img
          className={styles.photo}
          src={imgSrc}
          alt="Фотография с семинара"
          onError={handleImageError}
        />
        <div className={styles.description}>
          <h2>{seminar.title}</h2>
          <p>{seminar.description}</p>
        </div>
        <div className="flex-container">
          <p>Дата: {seminar.date}</p>
          <p>Время: {seminar.time}</p>
        </div>
        <div className="flex-container">
          <button onClick={onUpdate}>Редактировать</button>
          <button onClick={onDelete}>Удалить</button>
        </div>
      </div>
    </>
  );
}
