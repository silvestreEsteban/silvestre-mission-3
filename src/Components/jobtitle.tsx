import React from 'react';

interface JobTitleInputProps {
    jobTitle: string;
    setJobTitle: (jobTitle: string) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const JobTitleInput: React.FC<JobTitleInputProps> = ({ jobTitle, setJobTitle, handleKeyPress }) => (
    <div>
        <label htmlFor="job-title-input">Job Title:</label>
        <input
            type="text"
            id="job-title-input"
            name="job-title-input"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            required
        />
    </div>
);

export default JobTitleInput;