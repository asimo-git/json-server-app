import { Seminar } from "../utils/interfaces";

export default function SeminarCard({ seminar }: { seminar: Seminar }) {
  return (
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
    </div>
  );
}
