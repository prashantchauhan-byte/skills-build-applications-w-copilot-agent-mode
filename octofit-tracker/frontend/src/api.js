const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()
const API_ORIGIN = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${API_ORIGIN}/api`

export function normalizeCollection(payload, key) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.[key])) return payload[key]
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.[key])) return payload.data[key]
  return []
}

export async function fetchCollection(endpoint, key) {
  const response = await fetch(`${API_ORIGIN}${endpoint}`)
  if (!response.ok) {
    throw new Error(`Unable to load ${key} (${response.status})`)
  }

  return normalizeCollection(await response.json(), key)
}