const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload, key) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.[key])) return payload[key]
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.[key])) return payload.data[key]
  return []
}

export async function fetchCollection(path, key) {
  const response = await fetch(`${API_BASE_URL}/${path}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${key} (${response.status})`)
  }

  return normalizeCollection(await response.json(), key)
}