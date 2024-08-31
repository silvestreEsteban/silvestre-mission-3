import React, { useState } from 'react';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDAQzOj1sBChi-dNlimYMb8HENDu_rozSA';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel( { model: "gemini-1.5-flash"});

const JobTitle = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [prompt, setPrompt] = useState('');

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let testPrompt = '';
            if (jobTitle === 'Junior Software Developer') {
                testPrompt = 'You are a job interviewer, you are interviewing a candidate for a software engineering position. The candidate has done a tech accelerator program, and has experience with HTML, CSS, JS, Node.js, typescript, React.js, and Vite.js. Keep your responses less than 50 words. Get straight into the interview on the first interaction.';
            } else if (jobTitle === 'UX Designer') {
                testPrompt = 'You are a job interviewer, you are interviewing a candidate for a UX design position. The candidate has done a tech accelerator program, and has experience with Figma, Adobe XD, and Sketch. Keep your responses less than 50 words. Get straight into the interview on the first interaction. Remember that this is an interview, I am applying for a job.';
            } else if (jobTitle === 'Building Apprentice') {
                testPrompt = 'You are a job interviewer, you are interviewing somebody who has many years of building/carpentry experience and is doing his apprenticeship. Keep your responses less than 50 words. Get straight into the interview on the first interaction. Remember that this is an interview, I am applying for a job.';
            }

            const result = await model.generateContent(testPrompt);
            setPrompt(result.response.text());
        }
    };

    

    return (
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
    )
}

export default JobTitle;