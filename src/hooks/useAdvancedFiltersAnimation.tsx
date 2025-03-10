import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

function useAdvancedFiltersAnimation() {
  return useCallback((duration: number) => {
    const leftImgRef = useRef<HTMLImageElement | null>(null);
    const rightImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (leftImgRef.current && rightImgRef.current) {
        gsap.fromTo(
          leftImgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: duration,
            delay: duration + 0.2,
            ease: 'power2.out',
          },
        );
        gsap.fromTo(
          rightImgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: duration,
            delay: duration + 0.5,
            ease: 'power2.out',
          },
        );
      }
    }, [duration]);

    return (
      <>
        <div>
          <img
            ref={leftImgRef}
            src="/images/advanced-filters-left.png"
            className="absolute -left-5 bottom-4 w-7 lg:-left-9 lg:w-auto"
          />
        </div>
        <div>
          <img
            ref={rightImgRef}
            src="/images/advanced-filters-right.png"
            className="absolute -right-5 bottom-4 w-7 lg:-right-9 lg:w-auto"
          />
        </div>
      </>
    );
  }, []);
}

export default useAdvancedFiltersAnimation;
