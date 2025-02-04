export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

type NotificationType = "error" | "success";

export interface Notification {
  message: string;
  type: NotificationType;
}
