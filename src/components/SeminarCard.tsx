import { useState } from "react";
import { Seminar } from "../utils/interfaces";

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
      <div className="seminar-card">
        <img
          className="card-photo"
          src={imgSrc}
          alt="Фотография с семинара"
          onError={handleImageError}
        />
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <p>Дата: {seminar.date}</p>
        <p>Время: {seminar.time}</p>
        <div className="button-container">
          <button onClick={onUpdate}>Редактировать</button>
          <button onClick={onDelete}>Удалить</button>
        </div>
      </div>
    </>
  );
}
