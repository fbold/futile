import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-auto">
      <div className="mx-6 my-24 sm:mx-0 sm:w-1/2 2xl:w-1/3 text-center whitespace-pre-wrap">
        <div>
          <p className="text-lg">welcome to futile.me</p>
          <p className="text-sm">the digital home of written futility</p>

          <div className="relative mt-8 text-left whitespace-pre-wrap border p-5 text-text font-mono">
            <span className="absolute bg-text text-sec font-bold font-mono px-1 leading-none origin-top-left -translate-y-[21px] -translate-x-[21px] h-4 rotate-90">
              notice board
            </span>
            <p className="">
              If you&apos;re new here, please read{" "}
              <Link href="/meta/man" className="underline text-gn">
                the manual
              </Link>.
            </p>
            <br />
            <p>
              I am going to rewrite this in HTMX + Go, I should have done this from the start; NextJS is not suited to the ethos of this site.
            </p>
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
                considering changing to a monospaced font
              </li>
              <li className="pl-1.5">
                improving the navigation experience on mobile...
              </li>
              <li className="pl-1.5 line-through">
                a better way to distinguish whether you&apos;re reading private
                or void documents
              </li>
              <li className="pl-1.5 line-through">
                back ups. that&apos;s right, currenty none of the content here
                is backed up
              </li>
            </ul>

            <p>
              You can also always send me suggestions or feedback via email:
              fbold.dev@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
