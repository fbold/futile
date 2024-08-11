"use client"

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <p className="mx-6 sm:mx-0 sm:w-1/2 xl:w-1/5 text-justify whitespace-pre-wrap">
          welcome to <span className="underline">futile.me</span>
          <br />
          <br />
          this is a space for writing for yourself and the{" "}
          <span className="text-white font-semibold">void</span> / you can{" "}
          <span className="text-yw">write</span> for any categories you choose /
          you can manage your categories by navigating to{" "}
          <span className="text-gn">.me</span> / you can{" "}
          <span className="text-rd">read</span> your documents / any document
          can be sent to the{" "}
          <span className="text-white font-semibold">void</span> / documents in
          the <span className="text-white font-semibold">void</span> are visible
          to any user / there exists no way to link documents in the{" "}
          <span className="text-white font-semibold">void</span> to users / you
          can <span className="text-gn">visit</span> other users (in
          development)
        </p>
      </div>
    </>
  )
}
