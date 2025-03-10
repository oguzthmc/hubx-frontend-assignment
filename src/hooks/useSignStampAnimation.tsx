import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

function useSignStampAnimation() {
  return useCallback((duration: number) => {
    const signRef = useRef<HTMLImageElement | null>(null);
    const cmpRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (signRef.current && cmpRef.current) {
        // Start GSAP animation
        gsap.fromTo(
          signRef.current,
          { scale: 0, x: '50%', y: '-50%' },
          {
            scale: 1,
            duration: duration,
            delay: duration + 0.2,
            ease: 'power2.out',
          },
        );

        gsap.fromTo(
          cmpRef.current,
          { scale: 0, x: '-50%' },
          {
            scale: 1,
            duration: duration,
            delay: duration + 0.5,
            ease: 'power2.out',
          },
        );
      }
    }, [duration]);

    return (
      <>
        <img
          ref={signRef}
          src="/images/sign-stamp-sign.png"
          className="absolute -left-1/2 top-2/3 w-36 lg:w-auto"
        />
        <img
          ref={cmpRef}
          src="/images/sign-stamp-cmp.png"
          className="absolute -right-1/2 top-28 w-36 lg:top-36 lg:w-auto"
        />
      </>
    );
  }, []);
}

export default useSignStampAnimation;
