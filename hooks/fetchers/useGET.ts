import { useEffect, useState } from "react"

export default function useGET<ExpectedResultType>(url: string) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  async function trigger(url_: string = url) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url_, {
        method: "GET",
      })
      const result = await response.json()
      if (response.status !== 200) {
        console.log(result, response)
        setError(result.message)
        result.message as string
      } else {
        setSuccess(true)
        return result as ExpectedResultType
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      // client side fetch error
      setError("There was an error doing this")
    }
  }

  useEffect(() => {
    console.log({ error, loading, success })
  })

  return { success, error, loading, trigger }
}
