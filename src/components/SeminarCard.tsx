import { Seminar } from "../utils/interfaces";

interface SeminarCardProps {
  seminar: Seminar;
  onDelete: () => void;
  // onEdit: () => void;
}

export default function SeminarCard({ seminar, onDelete }: SeminarCardProps) {
  return (
    <>
      <div className="seminar-card">
        <img
          className="card-photo"
          src={seminar.photo}
          alt="Фотография с семинара"
        />
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <p>Дата: {seminar.date}</p>
        <p>Время: {seminar.time}</p>
        <div className="button-container">
          <button onClick={() => {}}>Редактировать</button>
          <button onClick={onDelete}>Удалить</button>
        </div>
      </div>
    </>
  );
}
