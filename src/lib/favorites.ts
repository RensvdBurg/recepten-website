const KEY = "favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: number) {
  const current = getFavorites();

  let updated: number[];
  if (current.includes(id)) {
    updated = current.filter((x) => x !== id);
  } else {
    updated = [...current, id];
  }

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
