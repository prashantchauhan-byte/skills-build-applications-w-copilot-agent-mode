import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useCollection(endpoint, key) {
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    let active = true

    fetchCollection(endpoint, key)
      .then((nextItems) => {
        if (active) {
          setItems(nextItems)
          setState({ loading: false, error: '' })
        }
      })
      .catch((error) => {
        if (active) setState({ loading: false, error: error.message })
      })

    return () => {
      active = false
    }
  }, [endpoint, key])

  return { items, ...state }
}