'use client';
import React, { useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { motion, MotionConfig } from 'framer-motion';
import useClickOutside from '@/hooks/useClickOutside';
import { ArrowLeft, Search, SearchIcon, User } from 'lucide-react';

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.2,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      className='relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function SearchbarDynamic() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentRef, { width, height }] = useMeasure();

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <MotionConfig transition={transition}>
      <div className='' ref={containerRef}>
        <div className=' w-full  rounded-xl  bg-zinc-900 '>
          <motion.div
            animate={{
              // @todo: here I want to remove the width
              width: isOpen ? `300px`: 'auto',
            }}
            initial={false}
          >
            <div ref={contentRef} className='overflow-hidden '>
              {!isOpen ? (
                <div className='flex '>
                  <Button
                    onClick={() => setIsOpen(true)}
                    ariaLabel='Search notes'
                  >
                    <SearchIcon size={20}/>
                  </Button>
                </div>
              ) : (
                <div className='flex '>
                  <Button onClick={() => setIsOpen(false)} ariaLabel='Back'>
                    <ArrowLeft className='h-5 w-5' />
                  </Button>
                  <div className='relative w-full'>
                    <input
                      className='h-9 w-full rounded-lg border border-zinc-950/10 bg-transparent p-2 focus:outline-none'
                      autoFocus
                      placeholder='Search notes'
                    />
                    <div className='absolute right-1 top-0 flex h-full items-center justify-center'></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
