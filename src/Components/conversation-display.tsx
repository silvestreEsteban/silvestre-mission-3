import React from 'react';

interface ConversationDisplayProps {
    conversation: { text: string, role: 'user' | 'interviewer' }[];
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ conversation }) => (
    <div id='conversation-display' className='conversation-display'>
        {conversation.map((msg, index) => (
            <p key={index} className={msg.role === 'user' ? 'user-text' : 'interviewer-text'}>
                {msg.text}
            </p>
        ))}
    </div>
);

export default ConversationDisplay;