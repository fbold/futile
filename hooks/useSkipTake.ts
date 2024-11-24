import { useEffect, useState } from "react"

export default function useSkipTake(initialSkipTake: [number, number]) {
  const [skipTake, setSkipTake] = useState<[number, number]>(initialSkipTake)

  const takeMore = (amount: number) => {
    setSkipTake((curr) => {
      console.log("000: the new skip take", curr)
      const newSkip = curr[0] + curr[1] // new skip is last skip plus last take
      const newTake = amount
      console.log("AAAA: the new skip take", newSkip, newTake)
      return [newSkip, newTake]
    })
  }

  useEffect(() => { console.log("SKIPTAKE CHANGED", skipTake) }, [skipTake])

  return {
    skipTake: [...skipTake],
    takeMore,
  }
}
