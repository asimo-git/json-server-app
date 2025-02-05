import { useCallback, useState } from "react";
import { getSeminars } from "../api/json-server-seminars";
import { Notification, Seminar } from "./interfaces";

export function useSeminars() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const fetchSeminars = useCallback(async () => {
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
  }, []);

  // Универсальная функция для выполнения асинхронных операций
  const handleAsyncAction = useCallback(
    async ({
      action,
      successMessage,
      errorMessage,
    }: {
      action: () => Promise<void | Seminar>;
      successMessage: string;
      errorMessage: string;
    }) => {
      try {
        setLoading(true);
        await action();
        setNotification({ message: successMessage, type: "success" });
      } catch {
        setNotification({ message: errorMessage, type: "error" });
      } finally {
        setLoading(false);
        void fetchSeminars();
      }
    },
    [fetchSeminars]
  );

  return {
    seminars,
    loading,
    notification,
    fetchSeminars,
    setNotification,
    handleAsyncAction,
  };
}
