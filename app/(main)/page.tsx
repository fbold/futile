"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-scroll">
      <div className="mx-6 my-24 sm:mx-0 sm:w-1/2 2xl:w-1/3 text-center whitespace-pre-wrap">
        <div>
          <p>welcome to futile.me</p>
          <p className="text-rd">
            if you&apos;re new here, please read the manual:
            <br />
            <Link href="/meta/man" className="underline">
              the manual
            </Link>
          </p>

          <div className="mt-10 text-left whitespace-pre-wrap border p-5 text-text font-mono">
            <p className="text-center">notice board</p>
            <br />
            <p>
              I work on this occasionally. These are some things I&apos;m
              planning to add:
            </p>
            <ul className={`ml-2 my-2 list-["+"] list-outside`}>
              <li className="pl-1.5">
                the ability to change the category of written documents
              </li>
              <li className="pl-1.5">
                a tag-like metadata system for documents (which you could maybe
                also use to filter)
              </li>
              <li className="pl-1.5">
                a better way to distinguish whether you&apos;re reading private
                or void documents
              </li>
              <li className="pl-1.5">
                a registry of public users which you can optionally add yourself
                to. still not sure about surrounding functionaliy, would be
                linked to as yet unimplemented{" "}
                <span className="text-gn">visit</span> option
              </li>
              <li className="pl-1.5">
                a way to mention other documents in the void by their id
                (implementation would be something like a tabbable autocomplete
                when typing a special character, ie &quot;@&quot;)
              </li>
              <li className="pl-1.5">
                back ups. that&apos;s right, currenty none of the content here
                is backed up
              </li>
              <li className="pl-1.5">
                considering changing to a monospaced font
              </li>
              <li className="pl-1.5">
                improving the navigation experience on mobile... jk
              </li>
            </ul>

            <p>
              You can also always send me suggestions or feedback via email:
              vurak.of.suclan@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
