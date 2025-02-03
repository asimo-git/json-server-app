import { useEffect, useState } from "react";
import { getSeminars } from "../api/json-server-seminars";
import { Seminar } from "../utils/interfaces";
import SeminarCard from "./SeminarCard";

export default function SeminarList() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      const data = await getSeminars();
      setSeminars(data);
    } catch (err) {
      setError("Что-то пошло не так. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <>
      {loading && (
        <img className="loader" src="/loader.gif" alt="Загрузка..." />
      )}
      {error && <p>{error}</p>}
      <div className="seminar-list">
        {seminars.map((seminar) => (
          <SeminarCard key={seminar.id} seminar={seminar} />
        ))}
      </div>
    </>
  );
}
