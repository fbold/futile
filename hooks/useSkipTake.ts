import { useCallback, useState } from "react"

export default function (initialSkipTake: [number, number]) {
  const [skipTake, setSkipTake] = useState<[number, number]>(initialSkipTake)

  const takeMore = useCallback((amount: number) => {
    let newSkip
    let newTake
    setSkipTake((curr) => {
      newSkip = curr[0] + amount
      newTake = curr[1] + amount
      return [newSkip, newTake]
    })

    return [newSkip, newTake]
  }, [])

  return {
    skipTake,
    takeMore,
  }
}
