'use client';
import useClickOutside from '@/hooks/useClickOutside';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useRef, useState, useEffect, useId } from 'react';
import { IconType } from 'react-icons/lib';

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
};

export default function Popover({Trigger, children}:{Trigger:IconType, children:React.ReactNode}) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<null | string>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setNote(null);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className='relative flex items-center justify-center'>
        <motion.button
        type='button'
          key='button'
          layoutId={`popover-${uniqueId}`}
          className=' items-center    '
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className='text-sm'
          >
           <Trigger size={20}/>
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className='absolute -left-1/2  top-full h-[200px] lg:h-[400px] w-[300px] lg:w-[500px] overflow-hidden border border-zinc-600 bg-zinc-800 text-white outline-none dark:bg-zinc-700'
              style={{
                borderRadius: 12,
              }}
            >
           {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
