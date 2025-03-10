import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

function useBatchScanningAnimation() {
  return useCallback((duration: number) => {
    const imgRefs = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
      if (imgRefs.current.length === 3) {
        gsap.fromTo(
          imgRefs.current[0],
          { x: '-50%', y: '100%', scaleX: 0.9 },
          {
            y: 0,
            duration: duration,
            delay: duration + 0.2,
            ease: 'power2.out',
          },
        );
        gsap.fromTo(
          imgRefs.current[1],
          { x: '-50%', y: '100%', scaleX: 0.95 },
          {
            y: 20,
            duration: duration,
            delay: duration + 0.6,
            ease: 'power2.out',
          },
        );
        gsap.fromTo(
          imgRefs.current[2],
          { x: '-50%', y: '100%' },
          {
            y: 40,
            duration: duration,
            delay: duration + 1,
            ease: 'power2.out',
          },
        );
      }
    }, [duration]);

    return (
      <>
        <img
          ref={(el) => (imgRefs.current[0] = el!)}
          src="/images/batch-scanning-doc.png"
          className="absolute -bottom-6 left-1/2 w-10/12 scale-x-90 lg:w-auto"
        />
        <img
          ref={(el) => (imgRefs.current[1] = el!)}
          src="/images/batch-scanning-doc.png"
          className="absolute -bottom-6 left-1/2 w-10/12 scale-x-90 lg:w-auto"
        />
        <img
          ref={(el) => (imgRefs.current[2] = el!)}
          src="/images/batch-scanning-doc.png"
          className="absolute -bottom-6 left-1/2 w-10/12 lg:w-auto"
        />
      </>
    );
  }, []);
}

export default useBatchScanningAnimation;
