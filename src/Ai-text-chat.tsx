import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import JobTitleInput from './Components/jobtitle';
import ConversationDisplay from './Components/conversation-display';
import ChatBox from './Components/chatbox';
import './App.css'

const API_KEY = import.meta.env.VITE_GEMINI_KEY;

const AiTextChat: React.FC = () => {

    const [conversation, setConversation] = useState<{ text: string, role: 'user' | 'interviewer' }[]>([
        { text: 'Welcome! To get started, input the title of the job you are applying for. Then you can send a message and we will get started right away!', role: 'interviewer' }
    ]);
    
    const [systemInstruction, setSystemInstruction] = useState('You are a job interviewer, you are interviewing a candidate for a software engineering position. After six user inputs you are to provide feedback on the user`s answers. The candidate has done a tech accelerator program, and has experience with HTML, CSS, JS, Node.js, typescript, React.js, and Vite.js. Keep your responses brief.')
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel( { 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction
    });    


    const handleSubmit = async (e: React.FormEvent, chatText: string) => {
        e.preventDefault();

        if (chatText.trim() !== '' && model) {
            setConversation(prev => [...prev, { text: `${chatText}`, role: 'user' }]);
          try {
            const aiResponse = await model.generateContent(chatText)
            if (jobTitle === '') {
                setConversation(prev => [...prev, { text: `Please input a job title and press enter...`, role: 'interviewer' }]);
            } else {
                setConversation(prev => [...prev, { text: `${aiResponse.response.text()}`, role: 'interviewer' }]);
            } } catch (error) {
                console.error('Error generating response:', error);
            }
        }
    };

    const [jobTitle, setJobTitle] = useState('');
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (jobTitle === 'Junior Software Developer') {
                setSystemInstruction(`
                    You are a job interviewer, 
                    you are interviewing a candidate for a software engineering position.
                    You are to provide feedback after six user inputs. 
                    The candidate has done a tech accelerator program, and has experience with HTML,
                    CSS, JS, Node.js, typescript, React.js, and Vite.js.
                    Keep your responses less than 50 words.
                    Get straight into the interview on the first interaction.`);
            } else if (jobTitle === 'UX Designer') {
                setSystemInstruction(`
                    You are a job interviewer, you are interviewing a candidate for a UX design position.
                    You are to provide feedback after six user inputs. 
                    The candidate has done a tech accelerator program, and has experience with Figma,
                    Adobe XD, and Sketch. Keep your responses less than 50 words.`);
            } else if (jobTitle === 'Building Apprentice') {
                setSystemInstruction(`
                    You are a job interviewer,
                    you are interviewing somebody who has many years of building/carpentry experience and is doing his apprenticeship.
                    You are to provide feedback after six user inputs. 
                    Keep your responses less than 50 words. Get straight into the interview on the first interaction.
                    Remember that this is an interview, I am applying for a job.`);
            } else alert('Please input a valid job title.');
        }
    };

    return (
        <div className='parent-div-ai-text-chat'>
            <div className='ai-text-chat-outer-shell'>
                <div className='ai-text-chat-inner-shell'>
                    <div className='ai-text-chat-form'>
                        <h3>AI Mock Interviewer</h3>
                        <JobTitleInput jobTitle={jobTitle} setJobTitle={setJobTitle} handleKeyPress={handleKeyPress} />
                        <ConversationDisplay conversation={conversation} />
                        <ChatBox handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiTextChat;