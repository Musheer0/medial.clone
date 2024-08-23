'use client';
import React, { useState } from 'react';
import { TransitionPanel } from './core/transtion-panel';
import { TabTransitonPanelProps } from '@/type';

export function TabsTransitionPanel({pages}:{pages:TabTransitonPanelProps[]}) {
  const [activeIndex, setActiveIndex] = useState(0);
  if(!pages) return "error no pages found"
  
//[trigger, components]

  return (
    <div>
      <div className='mb-4 flex  border items-center rounded-xl border-zinc-800'>
        {pages.map(({Trigger}, index) => (

          <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`rounded-xl px-3 flex-1 py-2 text-sm font-medium ${
            activeIndex === index
              ? 'bg-zinc-800'
              : ''
          }`}
        >
          <Trigger/>
        </button>
        ))}
      </div>
      <div className='overflow-hidden border-t border-zinc-200 dark:border-zinc-700'>
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          variants={{
            enter: { opacity: 0, y: -50, filter: 'blur(10px)' },
            center: { opacity: 1, y: 0, filter: 'blur(0px)' },
            exit: { opacity: 0, y: 50, filter: 'blur(10px)' },
          }}
        >
          {pages.map(({ Component }, index) => (
            <div key={index} className='py-2'>
              {activeIndex === index && <Component />}
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}
