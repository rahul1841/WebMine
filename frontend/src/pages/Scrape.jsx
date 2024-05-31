
import React, { useState, useEffect, useContext } from 'react';
import { ReviewContext } from '../ReviewContext';
import { motion } from 'framer-motion';
import { fadeIn } from '../components/common/motionFrameVarients';
import HighlightText from '../components/core/HomePage/HighlightText';
import Footer from '../components/common/Footer';
import { SearchIcon } from '@heroicons/react/outline';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

function Main() {
    const { reviews, setReviews, sentiments, setSentiments } = useContext(ReviewContext);
    const [url, setUrl] = useState('');
    const [website, setWebsite] = useState('amazon');
    const [numReviews, setNumReviews] = useState(10); // State for number of reviews
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Preparing...');
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const reviewsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
        localStorage.setItem('sentiments', JSON.stringify(sentiments));
    }, [reviews, sentiments]);

    const handleChangeUrl = (event) => {
        setUrl(event.target.value);
    };

    const handleChangeWebsite = (event) => {
        setWebsite(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setLoadingMessage('Preparing...');

        setTimeout(() => setLoadingMessage('Scraping...'), 13000);
        setTimeout(() => setLoadingMessage('Analysing...'), 32000);
        setTimeout(() => setLoadingMessage('Displaying...'), 42000);

        try {
            const response = await fetch(`https://webmine-backend-python.onrender.com/scrape_details?product_link=${encodeURIComponent(url)}&website=${website}&num_reviews=${numReviews}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            console.log('Data fetched:', data);

            const combinedReviews = data['Reviewer Names'].map((_, index) => ({
                name: data['Reviewer Names'][index],
                rating: data['Ratings'][index],
                date: data['Review Dates'][index],
                heading: data['Review Headings'][index],
                text: data['Review Texts'][index]
            }));

            setReviews(combinedReviews);

            setSentiments({
                sentimentScores: data['Sentiment Scores'],
                topNegativeKeywords: data['Top Negative Keywords'],
                topPositiveKeywords: data['Top Positive Keywords']
            });

            setCurrentPage(1); // Reset current page to 1 when new reviews are fetched
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to fetch reviews. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const hasNextPage = indexOfLastReview < reviews.length;
    const hasPreviousPage = indexOfFirstReview > 0;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reviews);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
        XLSX.writeFile(workbook, 'reviews.xlsx');
    };

    const exportToCSV = () => {
        const csvData = reviews.map(review => ({
            Name: review.name,
            Rating: review.rating,
            Date: review.date,
            Heading: review.heading,
            Text: review.text
        }));
        const csvContent = Papa.unparse(csvData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "reviews.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Rating', 'Date', 'Heading', 'Text']],
            body: reviews.map(review => [review.name, review.rating, review.date, review.heading, review.text])
        });
        doc.save('reviews.pdf');
    };

    const handleAnalysisClick = () => {
        navigate('/scrape/analysis', { state: { reviews } });
    };

    const handleChangeNumReviews = (event) => {
        let value = event.target.value;
        value = value.replace(/^0+/, ''); // Remove leading zeros
        if (value === '') {
            setNumReviews(''); // Allow the user to clear the input
        } else {
            const numericValue = Math.min(100, Math.max(1, parseInt(value))); // Change 99 to 100
            setNumReviews(numericValue);
        }
    };
     

    const handleBlurNumReviews = () => {
        if (numReviews === '') {
            setNumReviews(1); // Set to 1 if the input is empty
        }
    };

    

    const clearReviews = () => {
        setReviews([]);
        setSentiments({
            sentimentScores: [],
            topNegativeKeywords: [],
            topPositiveKeywords: []
        });
        localStorage.removeItem('reviews');
        localStorage.removeItem('sentiments');
    };

    return (
        <React.Fragment>
            <div className='flex flex-col min-h-screen'>
                <div className='flex-grow relative justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>
                    <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7'
                    >
                        Your Success
                        <HighlightText text={'Fuels Ours'} />
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                    >
                        Discover valuable insights from any webpage Enter the URL below to uncover a wealth of information.
                    </motion.div>

                    <form onSubmit={handleSubmit} className='mt-8 flex items-center flex-col sm:flex-row'>
                        <div className="relative flex w-full sm:w-auto mb-4 sm:mb-0">
                            <input
                                type='text'
                                value={url}
                                onChange={handleChangeUrl}
                                placeholder='Enter URL for Scrapping the Customer Reviews'
                                className='border border-gray-400 rounded-l-sm rounded-r-md py-2 px-4 mr-0 focus:outline-none focus:border-blue-500 flex-1 bg-transparent text-white placeholder-gray-300 w-full sm:min-w-[500px]'
                            />
                            <button type='submit' className='absolute inset-y-0 right-0 bg-blue-500 text-white py-2 px-4 rounded-r-sm rounded-l-none focus:outline-none hover:bg-blue-600 flex items-center justify-center'>
                                <SearchIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="relative flex w-full sm:w-auto mb-4 sm:mb-0 ml-0 sm:ml-4">

                            <select
                                value={website}
                                onChange={handleChangeWebsite}
                                className="border border-gray-400 rounded-l-sm py-2 px-4 mr-0 focus:outline-none focus:border-blue-500 bg-transparent text-white placeholder-gray-300  "
                            >
                                <option value="amazon" className='text-black bg-richblack-300'>Amazon</option>
                                <option value="flipkart" className='text-black bg-richblack-300'>Flipkart</option>
                                <option value="myntra" className='text-black bg-richblack-300'>Myntra</option>
                            </select>

                        </div>
                        <div className="relative relative sm:ml-4 w-full sm:w-auto ">
                            <input
                                type="number"
                                value={numReviews}
                                onChange={handleChangeNumReviews}
                                onBlur={handleBlurNumReviews}
                                min="0"
                                max="100"
                                placeholder="1-100"
                                className="border border-gray-400 rounded-l-sm py-2 px-4 mr-0 focus:outline-none focus:border-blue-500 bg-transparent text-white placeholder-gray-300 "
                            />
                        </div>

                    </form>

                    {currentReviews != 0 &&
                        <button onClick={clearReviews} className='mt-4 text-caribbeangreen-25 hover:text-caribbeangreen-50 py-2 px-4 rounded-md focus:outline-none'>
                            Clear Reviews
                        </button>
                    }

                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                    <div className='mt-8 mb-24 w-full'>
                        <div className='flex justify-between items-center mb-4'>
                            {currentReviews != 0 &&
                                <h2 className='font-semibold text-2xl text-yellow-100'>Reviews ({reviews.length})</h2>
                            }
                            {currentReviews.length > 0 && (
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                    <button onClick={exportToExcel} className='bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 w-full sm:w-auto'>
                                        Download as Excel
                                    </button>
                                    <button onClick={exportToCSV} className='bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 w-full sm:w-auto'>
                                        Download as CSV
                                    </button>
                                    <button onClick={exportToPDF} className='bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-25 w-full sm:w-auto'>
                                        Download as PDF
                                    </button>
                                </div>
                            )}

                        </div>
                        {isLoading ? (
                            <div className='flex justify-center items-center w-full h-full mt-4'>
                                <p className='text-lg font-bold text-yellow-25'>{loadingMessage}</p>
                            </div>
                        ) : currentReviews ? (
                            <div className=''>
                                <ul className='flex flex-col gap-3'>
                                    {currentReviews.map((review, index) => (
                                        <li key={index} className='mb-2 flex flex-col'>
                                            <div>
                                                <strong className='text-xl underline'>{review.name}</strong> <span> : </span>
                                            </div>
                                            <div>
                                                <span className='text-yellow-25'>{review.rating}</span> - {review.date}
                                                <h3 className='text-caribbeangreen-100 text-xl'>{review.heading}</h3>
                                            </div>
                                            <p>{review.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No reviews available</p>
                        )}

                        <div className="flex justify-between mt-4 w-full">
                            {hasPreviousPage && (
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50"
                                >
                                    Previous
                                </button>
                            )}
                            {currentReviews != 0 &&
                                <button onClick={handleAnalysisClick} className='bg-caribbeangreen-50 text-black py-2 px-4 mx-auto rounded-md focus:outline-none hover:bg-caribbeangreen-100'>
                                    View Analysis
                                </button>
                            }
                            {hasNextPage && (
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Main;



