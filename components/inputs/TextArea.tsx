"use client"
import React, { useState, useRef, useEffect } from 'react';
interface ResizableTextareaProps {
    placeholder: string,
    name:string,
    onChange? : any,
    height?:number,
    bg?:string
  }
  
  
const ResizableTextarea: React.FC<ResizableTextareaProps> = ({placeholder, name, onChange, height,bg}) => {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height || 120}px`; // Reset the height to recalculate
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`; // Adjust height based on scrollHeight with max height
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   onChange &&  onChange(e.target.value)
    setText(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      name={name}
      id="caption"
      placeholder={placeholder}
      className={`w-full resize-none focus:outline-none focus:border-2  border-zinc-600 overflow-scroll-auto bg-zinc-${bg|| 800} rounded-xl px-2 p-1`}
      style={{ maxHeight: '500px'}}
    />
  );
};

export default ResizableTextarea;
