// src/ReviewContext.jsx

import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [sentiments, setSentiments] = useState({
        sentimentScores: [],
        topNegativeKeywords: [],
        topPositiveKeywords: []
    });

    return (
        <ReviewContext.Provider value={{ reviews, setReviews, sentiments, setSentiments }}>
            {children}
        </ReviewContext.Provider>
    );
};
