import { useCallback, useEffect, useState } from "react";
import { deleteSeminar, updateSeminar } from "../../api/json-server-seminars";
import { useSeminars } from "../../utils/hooks";
import { Seminar } from "../../utils/interfaces";
import { Modal } from "../Modal/Modal";
import { PopUp } from "../PopUp/PopUp";
import SeminarCard from "../SeminarCard/SeminarCard";
import SeminarEditForm from "../SeminarEditForm/SeminarEditForm";
import styles from "./SeminarList.module.css";

export default function SeminarList() {
  // Основные состояния и функции кастомного хука для работы с семинарами
  const {
    seminars, // Список семинаров
    loading, // Состояние загрузки
    notification, // Уведомления об успехе или ошибке
    fetchSeminars, // Функция для получения семинаров с сервера
    setNotification, // Установка уведомлений
    handleAsyncAction, // Обработчик для выполнения асинхронных операций (удаление, обновление)
  } = useSeminars();

  // Локальные состояния для отслеживания удаляемого и редактируемого семинара.
  const [deletingSeminar, setDeletingSeminar] = useState<number | null>(null);
  const [updatingSeminar, setUpdatingSeminar] = useState<Seminar | null>(null);

  // Загружаем список семинаров при монтировании компонента.
  useEffect(() => {
    void fetchSeminars();
  }, [fetchSeminars]);

  const handleDelete = useCallback(async () => {
    if (!deletingSeminar) return;
    await handleAsyncAction({
      action: () => deleteSeminar(deletingSeminar),
      successMessage: "Удалено!",
      errorMessage: "Не удалось удалить семинар, попробуйте позже.",
    });
    setDeletingSeminar(null);
  }, [deletingSeminar, handleAsyncAction]);

  const handleUpdate = useCallback(
    async (updatedData: Seminar) => {
      await handleAsyncAction({
        action: () => updateSeminar(updatedData),
        successMessage: "Изменения сохранены!",
        errorMessage: "Не удалось обновить семинар, попробуйте позже.",
      });
      setUpdatingSeminar(null);
    },

    [handleAsyncAction]
  );

  return (
    <>
      {/* Отображение лоадера при глобальной загрузке и отсутствии активных модальных окон */}
      {loading && !deletingSeminar && !updatingSeminar ? (
        <img className={styles.loader} src="/loader.gif" alt="Загрузка..." />
      ) : (
        <>
          {" "}
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
          {/* Отображение Модального окна в зависимости от выбранного семинара */}
          {deletingSeminar && (
            <Modal onClose={() => setDeletingSeminar(null)}>
              {" "}
              <p>Вы уверены, что хотите удалить семинар?</p>
              <button
                className={styles.acceptBtn}
                onClick={() => void handleDelete()}
              >
                {/* Отображение лоадера на кнопке после нажатия кнопки */}
                {loading ? (
                  <img
                    className={styles.smallLoader}
                    src="/loader.gif"
                    alt="Загрузка..."
                  />
                ) : (
                  "Подтвердить"
                )}
              </button>
            </Modal>
          )}
          {updatingSeminar && (
            <Modal onClose={() => setUpdatingSeminar(null)}>
              <SeminarEditForm
                seminar={updatingSeminar}
                onSubmit={(data) => void handleUpdate(data)}
                loading={loading}
              />
            </Modal>
          )}
        </>
      )}

      {notification && (
        <PopUp
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
