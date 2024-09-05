import React, { useState } from 'react';

interface ChatBoxProps {
    handleSubmit: (e: React.FormEvent, chatText: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ handleSubmit }) => {
    const [chatText, setChatText] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        handleSubmit(e, chatText);
        setChatText('');
    };

    return (
        <form onSubmit={onSubmit}>
            <span id='chat-box-span'>
            <input
                type="text"
                id="chat-box-input"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
            />
            <button type="submit" id="submit" value='Submit'>Submit</button>
            </span>
        </form>
    );
};

export default ChatBox;