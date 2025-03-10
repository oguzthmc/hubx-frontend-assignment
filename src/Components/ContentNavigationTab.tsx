import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ContentNavigationTabIconProps {
  iconPath: string;
}

interface ContentNavigationTabProps extends ContentNavigationTabIconProps {
  tabLabel: string;
  isActive: boolean;
  onClick: () => void;
}

const ContentNavigationTabSvg = ({
  iconPath,
}: ContentNavigationTabIconProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Upload SVG file
    fetch(iconPath)
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, [iconPath]);

  useEffect(() => {
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      );
    }
  }, [svgContent]);

  return (
    <div
      ref={(el) => (svgRef.current = el as unknown as SVGSVGElement)}
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
    />
  );
};

export default function ContentNavigationTab({
  tabLabel,
  iconPath,
  isActive,
  onClick,
}: ContentNavigationTabProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    onClick();
    buttonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  return (
    <button
      ref={buttonRef}
      role="button"
      onClick={handleClick}
      className={`flex h-20 w-full min-w-[280px] flex-1 cursor-pointer snap-center items-center justify-center gap-x-4 border-r border-neutral-300 px-6 py-4 transition-colors last:border-r-0 xl:min-w-[270px] ${isActive ? 'animate-feature-svg bg-action/5' : 'bg-white'}`}
    >
      <ContentNavigationTabSvg iconPath={iconPath} />
      {tabLabel}
    </button>
  );
}
