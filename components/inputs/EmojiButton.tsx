"use client"; // Ensure this component runs on the client-side

import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiButtonProp {
    handleChange: (emoji: string) => void;
}

const EmojiButton: React.FC<EmojiButtonProp> = ({ handleChange }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    return (
        <div className='relative'>
            <button
                type='button'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className='p-2 rounded-md hover:bg-zinc-800'
            >
                <BsEmojiSmile />
            </button>
            {showEmojiPicker && (
                <div className='absolute left-0 p-4'>
                    <EmojiPicker
                        onEmojiClick={(emojiData: EmojiClickData) => {
                            handleChange(emojiData.emoji);
                        }}
                        //@ts-ignore
                        theme='dark'
                        className='absolute top-0 left-0'
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiButton;
