import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

function Wrapper({ className, children }: Props) {
  return (
    <section
      className={`mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-3 ${className}`}
    >
      {children}
    </section>
  );
}

export default Wrapper;
