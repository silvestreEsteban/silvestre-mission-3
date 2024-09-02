import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = import.meta.env.VITE_GEMINI_KEY;




const AiTextChat: React.FC = () => {
    const [chatText, setChatText] = useState<string>('');
    const [conversation, setConversation] = useState<{ text: string, role: 'user' | 'interviewer' }[]>([
        {text: 'Interviewer: Tell me about yourself.', role: 'interviewer'}
    ]);


    const [systemInstruction, setSystemInstruction] = useState('You are a job interviewer, you are interviewing a candidate for a software engineering position. The candidate has done a tech accelerator program, and has experience with HTML, CSS, JS, Node.js, typescript, React.js, and Vite.js. Keep your responses brief. There will be 2 questions and 2 answers. After that I want you give the user a review on how well they answered the questions, and suggest how their responses could be improved.')
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel( { 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction
    });    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (chatText.trim() !== '') {
            setConversation(prev => [...prev, { text: `${chatText}`, role: 'user' }]);
            setChatText('');
            
          
            // AI Response
            const aiResponse = await model.generateContent(chatText);
            setConversation(prev => [...prev, { text: `${aiResponse.response.text()}`, role: 'interviewer' }]);

            setChatText('');
        }
    };

    const [jobTitle, setJobTitle] = useState('');
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            alert(`You entered ${jobTitle}`);
            if (jobTitle === 'Junior Software Developer') {
              setSystemInstruction('You are a job interviewer, you are interviewing a candidate for a software engineering position. The candidate has done a tech accelerator program, and has experience with HTML, CSS, JS, Node.js, typescript, React.js, and Vite.js. Keep your responses less than 50 words. Get straight into the interview on the first interaction.');
            } else if (jobTitle === 'UX Designer') {
                setSystemInstruction('You are a job interviewer, you are interviewing a candidate for a UX design position. The candidate has done a tech accelerator program, and has experience with Figma, Adobe XD, and Sketch. Keep your responses less than 50 words. Get straight into the interview on the first interaction. Remember that this is an interview, I am applying for a job.');
            } else if (jobTitle === 'Building Apprentice') {
                setSystemInstruction('You are a job interviewer, you are interviewing somebody who has many years of building/carpentry experience and is doing his apprenticeship. Keep your responses less than 50 words. Get straight into the interview on the first interaction. Remember that this is an interview, I am applying for a job.');
            }

           
        }
    };

    return (
        <div className='parent-div-ai-text-chat'>
          <div className='ai-text-chat-outer-shell'>
            <div className='ai-text-chat-inner-shell'>
              <div className='ai-text-chat-form'>
                
                    <h3>AI Mock Interviewer</h3>
                    <br />
                    <div>
            <span id='job-title-span'><label htmlFor="job-title-input">Job Title:</label>
            <input  type="text"
                    id="job-title-input"
                    name="job-title-input"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    required/></span>
            <br />
        </div>
                    <div id='conversation-display' className='conversation-display'>
                            {conversation.map((msg, index) => (
                                <p key={index} className={msg.role === 'user' ? 'user-text' : 'interviewer-text'}>
                                {msg.text}
                            </p>
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