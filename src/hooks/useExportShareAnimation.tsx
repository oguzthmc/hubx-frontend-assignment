import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

function useExportShareAnimation() {
  return useCallback((duration: number) => {
    const arrowRef = useRef<HTMLImageElement | null>(null);
    const pdfRef = useRef<HTMLImageElement | null>(null);
    const jpgRef = useRef<HTMLImageElement | null>(null);
    const txtRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (
        arrowRef.current &&
        pdfRef.current &&
        jpgRef.current &&
        txtRef.current
      ) {
        // GSAP animations
        gsap.fromTo(
          arrowRef.current,
          { y: '200%' },
          {
            y: '0',
            duration: duration - 0.1,
            delay: duration + 0.5,
            ease: 'power2.out',
          },
        );

        gsap.fromTo(
          pdfRef.current,
          { y: '200%', x: '-50%' },
          {
            y: '0',
            duration: duration - 0.2,
            delay: duration + 0.7,
            ease: 'power2.out',
          },
        );

        gsap.fromTo(
          jpgRef.current,
          { y: '200%', x: '-50%' },
          {
            y: '0',
            duration: duration - 0.2,
            delay: duration + 1,
            ease: 'power2.out',
          },
        );

        gsap.fromTo(
          txtRef.current,
          { y: '200%', x: '50%' },
          {
            y: '0',
            duration: duration - 0.2,
            delay: duration + 1.3,
            ease: 'power2.out',
          },
        );
      }
    }, [duration]);

    return (
      <div className="absolute inset-0">
        <img
          ref={arrowRef}
          className="absolute -left-12 bottom-6"
          src="/images/export-share-arrow.png"
        />
        <img
          ref={pdfRef}
          className="absolute bottom-12 left-6 w-24 lg:w-auto"
          src="/images/export-share-pdf.png"
        />
        <img
          ref={jpgRef}
          className="absolute bottom-20 left-1/2 w-20 lg:w-auto"
          src="/images/export-share-jpg.png"
        />
        <img
          ref={txtRef}
          className="absolute bottom-12 right-6 w-24 lg:w-auto"
          src="/images/export-share-txt.png"
        />
      </div>
    );
  }, []);
}

export default useExportShareAnimation;
