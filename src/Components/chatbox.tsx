import React, { useState } from 'react';
import { GoPaperAirplane } from 'react-icons/go';

interface ChatBoxProps {
    handleSubmit: (e: React.FormEvent, chatText: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ handleSubmit }) => {
    
    const [chatText, setChatText] = useState<string>('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(e, chatText);
        setChatText('');
    };

    return (
        <div>
        <form onSubmit={onSubmit}>
            <span id='chat-box-span'>
            <input
                type="text"
                id="chat-box-input"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                
            />
            <button type="submit" id="submit" value='Submit'>Send  <span id='paper-airplane'><GoPaperAirplane style={{ color: 'white', fontSize: '14px' }}/></span></button>
            </span>
        </form>
        </div>
    );
};

export default ChatBox;