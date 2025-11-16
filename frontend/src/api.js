// src/api.js
const API_URL = import.meta.env.VITE_API_URL

export async function getData(endpoint) {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`)
    if (!res.ok) throw new Error('Network response was not ok')
    return await res.json()
  } catch (err) {
    console.error('API fetch error:', err)
    return null
  }
}
