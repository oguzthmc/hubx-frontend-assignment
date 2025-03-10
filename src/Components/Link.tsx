export interface LinkProps {
  linkUrl: string;
  linkTitle: string;
}

export default function Link({ linkUrl, linkTitle }: LinkProps) {
  return (
    <a
      href={linkUrl}
      className="mb-9 inline-block border border-neutral-200 px-4 py-3 transition-colors hover:border-action hover:bg-action hover:text-white focus:border-action focus:bg-action focus:text-white lg:mb-9 lg:px-5 lg:py-4 lg:text-xl"
    >
      {linkTitle}
    </a>
  );
}
