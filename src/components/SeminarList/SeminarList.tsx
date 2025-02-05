import { useCallback, useEffect, useState } from "react";
import {
  deleteSeminar,
  getSeminars,
  updateSeminar,
} from "../../api/json-server-seminars";
import { Notification, Seminar } from "../../utils/interfaces";
import { Modal } from "../Modal/Modal";
import { PopUp } from "../PopUp/PopUp";
import SeminarCard from "../SeminarCard/SeminarCard";
import SeminarEditForm from "../SeminarEditForm/SeminarEditForm";
import styles from "./SeminarList.module.css";

export default function SeminarList() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [deletingSeminar, setDeletingSeminar] = useState<number | null>(null);
  const [updatingSeminar, setUpdatingSeminar] = useState<Seminar | null>(null);

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

  const handleUpdate = useCallback(
    async (updatedData: Seminar) => {
      try {
        await updateSeminar(updatedData);
        setNotification({
          message: "Изменения сохранены!",
          type: "success",
        });
        fetchSeminars();
      } catch {
        setNotification({
          message: "Не удалось обновить семинар, попробуйте позже.",
          type: "error",
        });
      } finally {
        setUpdatingSeminar(null);
      }
    },
    [deletingSeminar]
  );

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <>
      {loading && (
        <img className={styles.loader} src="/loader.gif" alt="Загрузка..." />
      )}

      {notification && (
        <PopUp
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <div className={styles.seminarList}>
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            seminar={seminar}
            onDelete={() => setDeletingSeminar(seminar.id)}
            onUpdate={() => setUpdatingSeminar(seminar)}
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

      {updatingSeminar && (
        <Modal onCancel={() => setUpdatingSeminar(null)}>
          <SeminarEditForm seminar={updatingSeminar} onSubmit={handleUpdate} />
        </Modal>
      )}
    </>
  );
}
