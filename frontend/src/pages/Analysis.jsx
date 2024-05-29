
import React, { useContext } from 'react';
import { ReviewContext } from '../ReviewContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../components/common/motionFrameVarients';
import HighlightText from '../components/core/HomePage/HighlightText';
import Footer from '../components/common/Footer';
import { format, parse, subMonths, subYears, subDays } from 'date-fns';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Analysis() {
    const { reviews } = useContext(ReviewContext);
    const navigate = useNavigate();

    // Initialize starCounts with zero values for 1 to 5 stars
    const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Compute the starCounts based on the given logic
    reviews.forEach(review => {
        const rating = parseFloat(review.rating);
        if (rating > 0 && rating <= 1.5) {
            starCounts[1]++;
        } else if (rating <= 2.5) {
            starCounts[2]++;
        } else if (rating <= 3.5) {
            starCounts[3]++;
        } else if (rating <= 4.5) {
            starCounts[4]++;
        } else if (rating <= 5) {
            starCounts[5]++;
        }
    });

    const totalReviews = reviews.length;

    // Normalize month abbreviations
    const normalizeMonth = (dateString) => {
        const monthMap = {
            Sept: 'Sep',
            June: 'Jun',
            July: 'Jul'
            // Add more mappings if needed
        };
        return dateString.replace(/\b(Sept|June|July)\b/g, (match) => monthMap[match]);
    };

    // Function to parse the custom date string
    const parseCustomDate = (dateString) => {
        let date = null;

        // Amazon: "Reviewed in India on 6 April 2019"
        if (dateString.includes("Reviewed in")) {
            const match = dateString.match(/Reviewed in \w+ on (\d+ \w+ \d+)/);
            if (match) {
                date = match[1];
                try {
                    return parse(date, 'd MMMM yyyy', new Date());
                } catch (error) {
                    console.error('Error parsing Amazon date:', date, error);
                    return null;
                }
            }
        }

        // Flipkart: "Jul, 2022"
        if (dateString.match(/^[A-Za-z]{3}, \d{4}$/)) {
            try {
                return parse(dateString, 'MMM, yyyy', new Date());
            } catch (error) {
                console.error('Error parsing Flipkart date:', dateString, error);
                return null;
            }
        }

        // Flipkart: "X days ago"
        if (dateString.match(/^\d+ days? ago$/)) {
            const daysAgo = parseInt(dateString.split(' ')[0], 10);
            try {
                return subDays(new Date(), daysAgo);
            } catch (error) {
                console.error('Error parsing relative date:', dateString, error);
                return null;
            }
        }

        // Flipkart: "X months ago"
        if (dateString.match(/^\d+ months? ago$/)) {
            const monthsAgo = parseInt(dateString.split(' ')[0], 10);
            try {
                return subMonths(new Date(), monthsAgo);
            } catch (error) {
                console.error('Error parsing relative date:', dateString, error);
                return null;
            }
        }

        // Flipkart: "X years ago"
        if (dateString.match(/^\d+ years? ago$/)) {
            const yearsAgo = parseInt(dateString.split(' ')[0], 10);
            try {
                return subYears(new Date(), yearsAgo);
            } catch (error) {
                console.error('Error parsing relative date:', dateString, error);
                return null;
            }
        }

    // Myntra: "2 Nov 2023" or "19 Sept 2020", "29 June 2022", "9 July 2021"
    if (dateString.match(/^\d{1,2} \w{3,4} \d{4}$/)) {
        const normalizedDateString = normalizeMonth(dateString);
        try {
            return parse(normalizedDateString, 'd MMM yyyy', new Date());
        } catch (error) {
            console.error('Error parsing Myntra date:', normalizedDateString, error);
            return null;
        }
    }

        console.error('Invalid date format:', dateString);
        return null;
    };

    // Month-over-Month Analysis
    const reviewsByMonth = {};
    reviews.forEach(review => {
        const date = parseCustomDate(review.date);
        if (date) {
            const monthYear = format(date, 'yyyy-MM');
            if (!reviewsByMonth[monthYear]) {
                reviewsByMonth[monthYear] = 0;
            }
            reviewsByMonth[monthYear]++;
        }
    });

    const sortedMonths = Object.keys(reviewsByMonth).sort();

    // Prepare data for recharts
    const chartData = sortedMonths.map((month, index) => {
        const previousMonthCount = index > 0 ? reviewsByMonth[sortedMonths[index - 1]] : 0;
        const currentMonthCount = reviewsByMonth[month];
        const growth = currentMonthCount - previousMonthCount;
        return {
            month,
            reviews: currentMonthCount,
            growth: growth
        };
    });

    return (
        <React.Fragment>
            <div className='relative justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white mb-20'>
                <motion.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='text-center text-3xl lg:text-4xl font-semibold mt-7'
                >
                    Reviews and
                    <HighlightText text={'Month Over Month Analysis'} />
                </motion.div>

                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                >
                    Gain insights into the distribution of customer ratings.
                </motion.div>

                <div className='flex flex-col lg:flex-row justify-between w-full mt-12 mb-24'>
                    <div className='lg:w-1/2 lg:pr-4 mb-8 lg:mb-0'>
                        <h2 className='font-semibold text-2xl text-yellow-100 mb-4'>Total Reviews: {totalReviews}</h2>
                        <ul className='flex flex-col gap-3'>
                            {[5, 4, 3, 2, 1].map(star => (
                                <li key={star} className='flex items-center justify-between bg-richblack-800 p-4 rounded-md'>
                                    <span className='text-xl text-yellow-100'>{star} Star:</span>
                                    <span className='text-xl text-caribbeangreen-100'>{starCounts[star]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='lg:w-1/2 lg:pl-4'>
                        <h2 className='font-semibold text-2xl text-yellow-100 mb-4 ml-14'>Month-over-Month Analysis</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="reviews" stroke="#8884d8" />
                                <Line type="monotone" dataKey="growth" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex justify-center m-4">
                    <button
                        className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 mr-4"
                        onClick={() => navigate('/scrape')}
                    >
                        Back to Scrape
                    </button>
                    <button
                        className="bg-caribbeangreen-50 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-caribbeangreen-100 mr-4"
                        onClick={() => navigate('/scrape/analysis/summary')}
                    >
                        Get Summary
                    </button>
                    <button
                        className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            <Footer />
        </React.Fragment>
    );
}

export default Analysis;

