"use client"

export default function Home() {
  const refresh = async () => {
    await fetch("/api/auth/refresh", {
      method: "POST",
    })
  }
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <button onClick={refresh}>refresh</button>
      </div>
    </>
  )
}
