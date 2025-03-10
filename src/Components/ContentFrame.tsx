import gsap from 'gsap';
import Link, { LinkProps } from './Link';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

const ANIMATION_DURATION = 0.5;

interface ContentFrameHeaderProps {
  title: string;
  actionTitle: string;
  description: string;
}

interface ContentFrameImageProps {
  mobileImageUrl: string;
  desktopImageUrl: string;
  alt: string;
}

export interface ContentFrameProps
  extends ContentFrameHeaderProps,
    ContentFrameImageProps,
    Omit<LinkProps, 'linkTitle'> {
  linkTitle?: string;
  className?: string;
  animateAfter?: ((duration: number) => ReactNode) | undefined;
  isCurrent: boolean;
}

const ContentFrameHeader = ({
  title,
  actionTitle,
  description,
}: ContentFrameHeaderProps) => (
  <>
    <p className="mb-3 font-bold uppercase text-action lg:mb-6">
      {actionTitle}
    </p>
    <h1 className="mb-3 text-3xl font-bold lg:mb-6">{title}</h1>
    <p className="mb-3 text-[13px] leading-7 lg:mb-8 lg:text-xl lg:leading-8">
      {description}
    </p>
  </>
);

const ContentFrameImage = ({
  mobileImageUrl,
  desktopImageUrl,
  alt,
}: ContentFrameImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const pictureRef = useRef<HTMLElement | null>(null);

  const handleLoading = () => setLoaded(true);

  useEffect(() => {
    if (pictureRef.current) {
      gsap.fromTo(
        pictureRef.current,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_DURATION,
          delay: ANIMATION_DURATION - 0.2,
          ease: 'power2.out',
        },
      );
    }
  }, []);

  return (
    <picture
      ref={pictureRef}
      onLoad={handleLoading}
      className={`${loaded ? 'h-auto' : 'h-[246px] lg:h-[600px]'}`}
    >
      <source srcSet={desktopImageUrl} media="(min-width: 1024px)" />
      <img
        className="w-auto lg:order-1 lg:justify-self-start"
        alt={alt}
        src={mobileImageUrl}
      />
    </picture>
  );
};

export default function ContentFrame({
  title,
  actionTitle,
  description,
  linkUrl,
  linkTitle = 'Learn More',
  desktopImageUrl,
  mobileImageUrl,
  alt,
  className = '',
  animateAfter,
  isCurrent,
}: ContentFrameProps) {
  const articleRef = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Article entry animation
    if (articleRef.current) {
      gsap.fromTo(
        articleRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: ANIMATION_DURATION,
          ease: 'power2.out',
        },
      );
    }

    // Image container animation (Slide up)
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { y: '100%' },
        {
          y: 0,
          duration: ANIMATION_DURATION,
          delay: ANIMATION_DURATION - 0.2,
          ease: 'power2.out',
        },
      );
    }

    // Cleanup function (apply fade-out animation if unmounted)
    return () => {
      if (articleRef.current) {
        gsap.to(articleRef.current, {
          opacity: 0,
          duration: ANIMATION_DURATION,
          ease: 'power2.out',
        });
      }
    };
  }, []);

  return (
    <article
      ref={articleRef}
      className={`grid w-full grid-cols-1 place-items-center overflow-hidden lg:grid-cols-2 ${className} ${isCurrent ? 'grid' : 'hidden'}`}
    >
      <div className="text-center lg:order-2 lg:text-right">
        <ContentFrame.Header
          title={title}
          actionTitle={actionTitle}
          description={description}
        />
        <ContentFrame.ActionButton linkTitle={linkTitle} linkUrl={linkUrl} />
      </div>

      <div ref={imageContainerRef} className="relative">
        <ContentFrame.Image
          alt={alt}
          desktopImageUrl={desktopImageUrl}
          mobileImageUrl={mobileImageUrl}
        />
        {animateAfter && animateAfter(ANIMATION_DURATION)}
      </div>
    </article>
  );
}

ContentFrame.Header = ContentFrameHeader;
ContentFrame.Image = ContentFrameImage;
ContentFrame.ActionButton = Link;
