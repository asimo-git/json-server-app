// т к формат даты вида "01.02.2025" не совпадает с требуемым форматом Input "yyyy-MM-dd" осуществляем преобразование:
export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";

  const partsOfDate = dateString.split(".");
  if (partsOfDate.length !== 3) return dateString;

  const [day, month, year] = partsOfDate;
  return `${year}-${month}-${day}`;
};

// Обратное преобразование из YYYY-MM-DD в DD.MM.YYYY для сохранения на сервере
export const formatDateForServer = (dateString: string): string => {
  if (!dateString) return "";

  const partsOfDate = dateString.split("-");
  if (partsOfDate.length !== 3) return dateString;

  const [year, month, day] = partsOfDate;
  return `${day}.${month}.${year}`;
};
