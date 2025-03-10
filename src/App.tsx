import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Wrapper from './Components/Wrapper';
import gsap from 'gsap';
import { ContentFrame, ContentNavigationTab } from './Components';
import {
  ADVANCED_FILTERS,
  BATCH_SCANNING,
  DOCUMENT_SCANNER,
  EXPORT_SHARE,
  SIGN_STAMP,
} from './static';
import {
  useAdvancedFiltersAnimation,
  useBatchScanningAnimation,
  useExportShareAnimation,
  useSignStampAnimation,
} from './hooks';
import { contents } from './static/contentData';

export function App() {
  const mainRef = useRef(null);
  const [currentContent, setCurrentContent] = useState(DOCUMENT_SCANNER);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
    );
  }, []);

  const handleTabClick = (clickedContent: string) => () => {
    setCurrentContent(clickedContent);
  };

  const handleSignStampAnimation = useSignStampAnimation();
  const handleBatchScanningAnimation = useBatchScanningAnimation();
  const handleAdvancedFiltersAnimation = useAdvancedFiltersAnimation();
  const handleExportShareAnimation = useExportShareAnimation();

  const callbackData = {
    DOCUMENT_SCANNER: undefined,
    SIGN_STAMP: handleSignStampAnimation,
    BATCH_SCANNING: handleBatchScanningAnimation,
    ADVANCED_FILTERS: handleAdvancedFiltersAnimation,
    EXPORT_SHARE: handleExportShareAnimation,
  };

  return (
    <main
      ref={mainRef}
      className="flex min-h-full flex-col justify-center overflow-y-auto bg-gray-100"
    >
      <Wrapper>
        {contents.map((content) => (
          <ContentFrame
            {...content}
            key={
              currentContent === content.key
                ? content.key
                : `inactive-${content.key}`
            }
            animateAfter={callbackData[content.key]}
            isCurrent={currentContent === content.key}
          />
        ))}
      </Wrapper>

      <section
        id="navigation-tabs"
        className="flex snap-x justify-between overflow-x-auto no-scrollbar"
      >
        <ContentNavigationTab
          iconPath="/icons/document-scanner.svg"
          tabLabel="Document Scanner"
          isActive={currentContent === DOCUMENT_SCANNER}
          onClick={handleTabClick(DOCUMENT_SCANNER)}
        />
        <ContentNavigationTab
          iconPath="/icons/sign-stamp.svg"
          tabLabel="Sign & Stamp"
          isActive={currentContent === SIGN_STAMP}
          onClick={handleTabClick(SIGN_STAMP)}
        />
        <ContentNavigationTab
          iconPath="/icons/batch-scanning.svg"
          tabLabel="Batch Scanning"
          isActive={currentContent === BATCH_SCANNING}
          onClick={handleTabClick(BATCH_SCANNING)}
        />
        <ContentNavigationTab
          iconPath="/icons/advanced-filters.svg"
          tabLabel="Advanced Filters"
          isActive={currentContent === ADVANCED_FILTERS}
          onClick={handleTabClick(ADVANCED_FILTERS)}
        />
        <ContentNavigationTab
          iconPath="/icons/export-share.svg"
          tabLabel="Export & Share"
          isActive={currentContent === EXPORT_SHARE}
          onClick={handleTabClick(EXPORT_SHARE)}
        />
      </section>
    </main>
  );
}
