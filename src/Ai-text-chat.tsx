import { useState } from 'react';

const AiTextChat: React.FC = () => {
    const [chatText, setChatText] = useState<string>('');
    const [conversation, setConversation] = useState<string[]>([
        'Interviewer: Tell me about yourself.',
    ]);
    const [aiResponse, setAiResponse] = useState<string>(`Interviewer: Tell me about yourself.`);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatText.trim() !== '') {
            setConversation(prev => [...prev, `Me: ${chatText}`]);

            // Simulation of the AI response, to be replaced by actual AI response later
             // Simulate AI response (replace this with actual AI response logic)
             const aiResponse = `Interviewer: This is a response to "${chatText}"`;
             setConversation(prev => [...prev, aiResponse]);

            setChatText('')
        }
    }
    return (
        <div className='parent-div-ai-text-chat'>
          <div className='ai-text-chat-outer-shell'>
            <div className='ai-text-chat-inner-shell'>
              <div className='ai-text-chat-form'>
                
                    <h3>AI Mock Interviewer</h3>
                    <br />
                    <span id='job-title-span'><label htmlFor="job-title-input">Job Title:</label>
                    <input type="text" id="job-title-input" name="job-title-input" required/></span>
                    <br />
                    <div id='conversation-display' className='conversation-display'>
                            {conversation.map((msg, index) => (
                                <div key={index}>{msg}</div>
                            ))}
                        </div>
                    
                        <form onSubmit={handleSubmit}>
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
                    
              </div>
            </div>
          </div>
        </div>
    )
}

export default AiTextChat;