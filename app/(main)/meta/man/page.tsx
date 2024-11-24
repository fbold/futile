import Link from "next/link"

const SectionTitle = ({
  title,
  children,
}: {
  title: string
  children: JSX.Element | JSX.Element[]
}) => (
  <div className="relative border border-text p-2">
    <span className="absolute bg-text text-sec font-bold font-mono px-1 leading-none origin-top-left -translate-y-[9px] -translate-x-2 h-4 rotate-90">
      {title}
    </span>
    {children}
  </div>
)

export default function Man() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-scroll">
      <div className="mx-6 sm:mx-0 sm:w-1/2 xl:w-1/3 whitespace-pre-wrap my-24 font-mono">
        <h2>the manual (it&apos;s short)</h2>
        <br />
        <SectionTitle title="what is">
          <p>
            futile.me is a written media platform for short texts, referred to
            as documents.{" "}
            <span className="underline">
              It is not a social platform for written media
            </span>
            ; there is no way to comment on or otherwise interact with other
            users&apos; documents. For the most part this will stay this way.
            All documents are anonymous, and all documents are private by
            default.
          </p>
        </SectionTitle>
        <br />
        <SectionTitle title="how to use">
          <p>
            The first step would be to create some categories to write in. These
            are your own classifications for whatever kinds of documents you
            would like to write. For example, I have a category for ramblings.
          </p>
          <br />
          <p>
            To create one you have to navigate to the{" "}
            <span className="text-gn">me</span> section, which can be done by
            hovering (or tapping on mobile) over the green partly-occluded
            circle in the bottom right corner of the page. You can then either
            scroll till the <span className="text-gn">me</span> option reaches
            the bottom, as though you were operating an old turn-dial phone, or
            by simply clicking the <span className="text-gn">me</span> once it
            has been made visible by the action of hovering+scrolling over the
            circular menu area.
          </p>
          <br />
          <p>
            This is the same way to navigate for all the circular menus on the
            page. The top left one is for{" "}
            <span className="text-rd">reading</span> your own writings and the
            top right is for <span className="text-yw">writing</span> them. They
            will be populated with the categories you define.
          </p>
          <br />
          <p>
            I am aware it is inconvenient to navigate on mobile. This will not
            change. Buy a second hand thinkpad and install linux on it to have
            the best experience using futile.me
          </p>
        </SectionTitle>
        <br />
        <SectionTitle title="the void">
          <p>
            The <span className="text-white">void</span> is where you can send
            documents for them to be visible to other users of the site.{" "}
            <span className="underline">
              By default all the documents you write are private
            </span>{" "}
            unless you choose to publish them. And even then,{" "}
            <span className="underline">
              there is no way to link any document in the void to a user
            </span>
            , they are detached.
          </p>
          <br />
          <p>
            You can publish documents to the void by using the circular menu
            that appears to the top-right of the text when reading one of your
            documents.
          </p>
        </SectionTitle>
        <br />
        <SectionTitle title="...">
          <p>
            futile.me is still very much in active development. If you spot any
            issues or would like to suggest any features please send an email to
            the following address:{" "}
            <a
              href="mailto:vurak.of.sulcan@gmail.com"
              target="_blank"
              className="underline"
            >
              fbold.dev@gmail.com
            </a>
            . I will fix any bugs with haste proportional to their criticality
            and will, at the least, briefly consider feature requests.
          </p>
          <br />
          <p>You can also open any issues or audit my code with love:</p>
          <Link className="underline" href="https://github.com/fbold/futile/">
            github.com/fbold/futile
          </Link>
        </SectionTitle>
      </div>
    </div>
  )
}
