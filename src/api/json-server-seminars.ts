import { SEMINARS_URL } from "../utils/constants";
import { Seminar } from "../utils/interfaces";

export async function getSeminars(): Promise<Seminar[]> {
  try {
    const response = await fetch(SEMINARS_URL);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error while requesting:", error);
    throw error;
  }
}
