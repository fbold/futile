import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-auto">
      <div className="mx-6 my-24 sm:mx-0 sm:w-1/2 2xl:w-1/3 text-center whitespace-pre-wrap">
        <div>
          <p className="underline font-mono">welcome to futile.me</p>
          <p className="font-mono">a digital home for written futility</p>
          <br />
          <p className="text-rd">
            if you&apos;re new here, please read the manual (or don&apos;apos;t
            if you&apos;apos;d rather explore)
            <br />
            <Link href="/meta/man" className="underline">
              the manual
            </Link>
            <br />
          </p>

          <div className="mt-10 text-left whitespace-pre-wrap border p-4 text-text font-mono">
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
                a registry of public users which you can optionally add yourself
                to. still not sure about surrounding functionaliy, would be
                linked to as yet unimplemented{" "}
                <span className="text-gn">visit</span> option
              </li>
              <li className="pl-1.5">
                a way to mention other void documents by their id
                (implementation would be something like a tabbable autocomplete
                when typing a special character, ie &quot;@&quot;)
              </li>
              <li className="pl-1.5">
                back ups (currenty none of the content here is backed up, but
                don&apos;t tell anyone, but consider this a warning)
              </li>
              <li className="pl-1.5">
                considering changing to a monospaced font site-wide
              </li>
              <li className="pl-1.5">
                improving the navigation experience on mobile... /s
              </li>
              <li className="pl-1.5">
                this one&apos;s just a good song{" "}
                <a className="underline" href="https://youtu.be/1VR0Wp1zO6Q">
                  https://youtu.be/1VR0Wp1zO6Q
                </a>
              </li>
              <li className="pl-1.5 line-through">
                a better way to distinguish whether you&apos;re reading private
                or void documents
              </li>
            </ul>

            <p>
              Please send suggestions and bug reports via email:
              <br />
              <span className="underline">fbold.dev@gmail.com</span>
            </p>
            <p>
              Or make an issue / pr on gh:
              <br />
              <Link
                className="underline"
                href="https://github.com/fbold/futile/"
              >
                github.com/fbold/futile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
