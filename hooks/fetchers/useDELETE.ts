import { useEffect, useState } from "react"

// no body because id of item to delete should be in the URL params
export default function useDELETE<ResultType>(url: string, body?: {}) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  async function trigger(body?: {}) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: body ? JSON.stringify(body) : null,
      })
      const result = await response.json()
      if (response.status !== 200) {
        console.log(result, response)
        setError(result.message)
        result.message as string
      } else {
        setSuccess(true)
        return result as ResultType
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      // client side fetch error
      setError("There was an error doing this")
    }
  }

  return { success, error, loading, trigger }
}
