import { SEMINARS_URL } from "../utils/constants";
import { Seminar } from "../utils/interfaces";

async function fetchWithErrorHandling<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    return response.json() as T;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
}

export function getSeminars(): Promise<Seminar[]> {
  return fetchWithErrorHandling<Seminar[]>(SEMINARS_URL);
}

export function deleteSeminar(id: number): Promise<void> {
  return fetchWithErrorHandling<void>(`${SEMINARS_URL}/${id}`, {
    method: "DELETE",
  });
}

export function updateSeminar(updatedData: Seminar): Promise<Seminar> {
  return fetchWithErrorHandling<Seminar>(`${SEMINARS_URL}/${updatedData.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}
