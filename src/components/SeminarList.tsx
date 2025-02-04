import { useCallback, useEffect, useState } from "react";
import { deleteSeminar, getSeminars } from "../api/json-server-seminars";
import { Notification, Seminar } from "../utils/interfaces";
import { Modal } from "./Modal";
import { PopUp } from "./PopUp";
import SeminarCard from "./SeminarCard";

export default function SeminarList() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [deletingSeminar, setDeletingSeminar] = useState<number | null>(null);
  // const [updatingSeminar, setUpdatingSeminar] = useState<number | null>(null);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      const data = await getSeminars();
      setSeminars(data);
    } catch {
      setNotification({
        message: "Что-то пошло не так. Попробуйте обновить страницу.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      if (deletingSeminar) {
        await deleteSeminar(deletingSeminar);
        setNotification({
          message: "Удалено!",
          type: "success",
        });
        fetchSeminars();
      } else {
        throw new Error("Отсутствует выбранный семинар");
      }
    } catch {
      setNotification({
        message: "Не удалось удалить семинар, попробуйте позже.",
        type: "error",
      });
    } finally {
      setDeletingSeminar(null);
    }
  }, [deletingSeminar]);

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <>
      {loading && (
        <img className="loader" src="/loader.gif" alt="Загрузка..." />
      )}
      {notification && (
        <PopUp
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="seminar-list">
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            seminar={seminar}
            onDelete={() => setDeletingSeminar(seminar.id)}
          />
        ))}
      </div>

      {deletingSeminar && (
        <Modal
          onConfirm={handleDelete}
          onCancel={() => setDeletingSeminar(null)}
        >
          {" "}
          <p>Вы уверены, что хотите удалить семинар?</p>
        </Modal>
      )}
    </>
  );
}
