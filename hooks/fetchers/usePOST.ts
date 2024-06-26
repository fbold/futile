import { useEffect, useState } from "react"

export default function usePOST<BodyType, ResultType = BodyType>(
  url: string
  // body: BodyType
) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  async function trigger(body: BodyType) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      })
      const result = await response.json()
      if (response.status !== 200) {
        console.log(result, response)
        setError(result.error)
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

  useEffect(() => {
    console.log({ error, loading, success })
  })

  return { success, error, loading, trigger }
}
