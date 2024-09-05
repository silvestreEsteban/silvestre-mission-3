import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import JobTitleInput from './Components/jobtitle';
import ConversationDisplay from './Components/conversation-display';
import ChatBox from './Components/chatbox';
import './App.css'

const API_KEY = import.meta.env.VITE_GEMINI_KEY;

const AiTextChat: React.FC = () => {

    interface GenerativeModel {
        generateContent: (input: string) => Promise<{ response: { text: () => string } }>;
    }

    const [conversation, setConversation] = useState<{ text: string, role: 'user' | 'interviewer' }[]>([
        { text: 'Interviewer: Input your job title and then we can get started right away. Tell me a bit about yourself', role: 'interviewer' }
    ]);
    const [systemInstruction, setSystemInstruction] = useState('You are a job interviewer, you are interviewing a candidate for a software engineering position. The candidate has done a tech accelerator program, and has experience with HTML, CSS, JS, Node.js, typescript, React.js, and Vite.js. Keep your responses brief. There will be 6 questions and 6 answers. After that I want you give the user a review on how well they answered the questions, and suggest how their responses could be improved.');
    const [model, setModel] = useState<GenerativeModel | null>(null);
    
    
    useEffect(() => {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const initializedModel = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: systemInstruction
        });
        setModel(initializedModel)
    }, [systemInstruction])
   

    const handleSubmit = async (e: React.FormEvent, chatText: string) => {
        e.preventDefault();

        if (chatText.trim() !== '' && model) {
            setConversation(prev => [...prev, { text: `${chatText}`, role: 'user' }]);

            const aiResponse = await model.generateContent(chatText);
            if (jobTitle === '') {
                setConversation(prev => [...prev, { text: `Please input a job title and press enter...`, role: 'interviewer' }]);
            } else {
                setConversation(prev => [...prev, { text: `${aiResponse.response.text()}`, role: 'interviewer' }]);
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
                    The candidate has done a tech accelerator program, and has experience with HTML,
                    CSS, JS, Node.js, typescript, React.js, and Vite.js.
                    Keep your responses less than 50 words.
                    Get straight into the interview on the first interaction.
                    After six questions and six answers, I want you give the user a review on how well they answered the questions, and suggest how their responses could be improved. Add this response to the end of your sixth response.`);
            } else if (jobTitle === 'UX Designer') {
                setSystemInstruction(`
                    You are a job interviewer, you are interviewing a candidate for a UX design position.
                    The candidate has done a tech accelerator program, and has experience with Figma,
                    Adobe XD, and Sketch. Keep your responses less than 50 words.
                    Respond to the user's answers six times. After that I want you give the user a review on how well they answered the questions, and suggest how their responses could be improved. Add this response to the end of your sixth response.`);
            } else if (jobTitle === 'Building Apprentice') {
                setSystemInstruction(`
                    You are a job interviewer,
                    you are interviewing somebody who has many years of building/carpentry experience and is doing his apprenticeship.
                    Keep your responses less than 50 words. Get straight into the interview on the first interaction.
                    Remember that this is an interview, I am applying for a job.
                    Respond to the user's answers six times. After that I want you give the user a review on how well they answered the questions, and suggest how their responses could be improved. Add this response to the end of your sixth response.`);
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