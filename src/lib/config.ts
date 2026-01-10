export const API_BASE_URL = (() => {
  const v = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!v) throw new Error("Missing env: NEXT_PUBLIC_API_BASE_URL");
  return v.replace(/\/+$/, "");
})();

export const getApiUrl = (path: string) => {
  if (!API_BASE_URL) return path;
  const base = API_BASE_URL.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${base}/${p}`;
};
