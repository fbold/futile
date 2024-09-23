export default function Man() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-scroll">
      <div className="mx-6 sm:mx-0 sm:w-1/2 xl:w-1/3 whitespace-pre-wrap my-24">
        <h1>The Manual</h1>
        <br />
        <h2>How do I use it?</h2>
        <p>
          The first step would be to create some categories to write in. These
          are your own classifications. For example, you might have a category
          for poems, essays, ideas...
        </p>
        <br />
        <p>
          To create one, you have to navigate to the{" "}
          <span className="text-gn">me</span> section, which can be done by
          hovering over the green partly-occluded circle in the bottom right
          corner of the page. You can then either scroll till the{" "}
          <span className="text-gn">me</span> option reaches the bottom, as
          though you were operating an old turn-dial phone, or by simply
          clicking the <span className="text-gn">me</span> once it has been made
          visible by the action of hovering+scrolling over the circular menu
          area.
        </p>
        <br />
        <p>
          This is the same way to navigate for all the circular menus on the
          page. The top left one is for <span className="text-rd">reading</span>{" "}
          your own writings and the top right is for{" "}
          <span className="text-yw">writing</span> them. They will be populated
          with the categories you define.
        </p>
        <br />
        <h2>What is the void?</h2>
        <p>
          The <span className="text-white">void</span> is where you can send
          documents for them to be visible to other users of the site.{" "}
          <strong>By default all the documents you write are private</strong>{" "}
          unless you choose to publish them.
        </p>
        <br />
        <p>
          You can publish documents to the void by using the circular menu that
          appears to the top-right of the text when reading one of your
          documents.
        </p>
        <br />
        <h2>What is this (and what is it not)?</h2>
        <p>
          futile.me is a written media platform for short texts, referred to as
          documents.{" "}
          <strong>It is not a social platform for written media.</strong> There
          is no way to comment on or otherwise interact with other users&apos;
          posts. For the most part this will stay this way.
        </p>
        <br />
        <h2>Still in active development</h2>
        <p>
          futile.me is still very much in active development. If you spot any
          issues or would like to suggest any features please send an email to
          the following address:{" "}
          <a
            href="mailto:vurak.of.sulcan@gmail.com"
            target="_blank"
            className="underline"
          >
            vurak.of.suclan@gmail.com
          </a>
          . I will try to fix any bugs as quickly as I can be bothered and will,
          at the least, briefly consider feature requests.
        </p>
      </div>
    </div>
  )
}
