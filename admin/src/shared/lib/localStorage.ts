export const writeJSON = <T>(value: T): string => {
  return JSON.stringify(value);
};

export const parseJSON = (value: string | null) => {
  if (!value) return;
  return JSON.parse(value);
};

export const writeLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, writeJSON(value));
};

export const readLocalStorage = (key: string) => {
  return parseJSON(localStorage.getItem(key));
};
