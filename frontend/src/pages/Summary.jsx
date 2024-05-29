
import React, { useContext } from 'react';
import { ReviewContext } from '../ReviewContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fadeIn } from '../components/common/motionFrameVarients';
import HighlightText from '../components/core/HomePage/HighlightText';
import Footer from '../components/common/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Summary() {
    const { sentiments } = useContext(ReviewContext);
    const navigate = useNavigate();
    const sentimentScores = sentiments.sentimentScores;
    const topNegativeKeywords = sentiments.topNegativeKeywords;
    const topPositiveKeywords = sentiments.topPositiveKeywords;

    const barData = {
        labels: sentimentScores.map((_, index) => `Review ${index + 1}`),
        datasets: [
            {
                label: 'Sentiment Score',
                data: sentimentScores,
                backgroundColor: sentimentScores.map(score => score > 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'),
                borderColor: sentimentScores.map(score => score > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
                borderWidth: 1,
            },
        ],
    };

    // const barData = {
    //     labels: sentimentScores.map((_, index) => `Review ${index + 1}`),
    //     datasets: [
    //         {
    //             label: 'Positive Sentiment Score',
    //             data: sentimentScores.map(score => (score > 0 ? score : 0)),
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         },
    //         {
    //             label: 'Negative Sentiment Score',
    //             data: sentimentScores.map(score => (score < 0 ? score : 0)),
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    const downloadCSV = () => {
        const data = [
            { type: 'Sentiment Scores', data: sentimentScores.map((score, index) => ({ Review: index + 1, SentimentScore: score })) },
            { type: 'Top Positive Keywords', data: topPositiveKeywords.map(([keyword, count]) => ({ Keyword: keyword, Count: count })) },
            { type: 'Top Negative Keywords', data: topNegativeKeywords.map(([keyword, count]) => ({ Keyword: keyword, Count: count })) },
        ];
        data.forEach(({ type, data }) => {
            const csv = Papa.unparse(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${type}.csv`);
            link.click();
        });
    };

    const downloadExcel = () => {
        const wb = XLSX.utils.book_new();

        const ws1 = XLSX.utils.json_to_sheet(sentimentScores.map((score, index) => ({ Review: index + 1, SentimentScore: score })));
        XLSX.utils.book_append_sheet(wb, ws1, 'Sentiment Scores');

        const ws2 = XLSX.utils.json_to_sheet(topPositiveKeywords.map(([keyword, count]) => ({ Keyword: keyword, Count: count })));
        XLSX.utils.book_append_sheet(wb, ws2, 'Top Positive Keywords');

        const ws3 = XLSX.utils.json_to_sheet(topNegativeKeywords.map(([keyword, count]) => ({ Keyword: keyword, Count: count })));
        XLSX.utils.book_append_sheet(wb, ws3, 'Top Negative Keywords');

        XLSX.writeFile(wb, 'sentiment_analysis.xlsx');
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Sentiment Analysis Report', 10, 10);

        const sentimentScoreData = sentimentScores.map((score, index) => [index + 1, score]);
        const positiveKeywordsData = topPositiveKeywords.map(([keyword, count]) => [keyword, count]);
        const negativeKeywordsData = topNegativeKeywords.map(([keyword, count]) => [keyword, count]);

        doc.autoTable({ startY: 20, head: [['Review', 'Sentiment Score']], body: sentimentScoreData });
        doc.text('Top Positive Keywords', 10, doc.lastAutoTable.finalY + 10);
        doc.autoTable({ startY: doc.lastAutoTable.finalY + 20, head: [['Keyword', 'Count']], body: positiveKeywordsData, theme: 'grid', headStyles: { fillColor: [75, 192, 192] } });
        doc.text('Top Negative Keywords', 10, doc.lastAutoTable.finalY + 10);
        doc.autoTable({ startY: doc.lastAutoTable.finalY + 20, head: [['Keyword', 'Count']], body: negativeKeywordsData, theme: 'grid', headStyles: { fillColor: [255, 99, 132] } });

        doc.save('sentiment_analysis.pdf');
    };

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
                    Sentiment analysis and 
                    <HighlightText text={'Key Insights'} />
                </motion.div>

                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                >
                    Understanding sentiment with keywords & reveal feedback trends
                </motion.div>

                <div className="flex justify-between w-full mt-10 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-caribbeangreen-100">Sentiment Scores</h2>
                    <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
                        <button
                            className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 w-full sm:w-auto"
                            onClick={downloadExcel}
                        >
                            Download as Excel
                        </button>
                        <button
                            className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 w-full sm:w-auto"
                            onClick={downloadCSV}
                        >
                            Download as CSV
                        </button>
                        <button
                            className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 w-full sm:w-auto"
                            onClick={downloadPDF}
                        >
                            Download as PDF
                        </button>
                    </div>
                </div>

                <div className="w-full mt-10" style={{ position: 'relative', height: '400px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>

                <div className="w-full mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-caribbeangreen-100">Top Positive Keywords</h2>
                    {topPositiveKeywords.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Keyword</th>
                                <th className="px-4 py-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPositiveKeywords.map(([keyword, count], index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{keyword}</td>
                                    <td className="border px-4 py-2">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        ) : (
                            <p className="text-center text-base lg:text-lg font-bold text-richblack-300">No positive keywords</p>
                        )}
                </div>

                <div className="w-full mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-caribbeangreen-100">Top Negative Keywords</h2>
                    {topNegativeKeywords.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Keyword</th>
                                <th className="px-4 py-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topNegativeKeywords.map(([keyword, count], index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{keyword}</td>
                                    <td className="border px-4 py-2">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        ) : (
                            <p className="text-center text-base lg:text-lg font-bold text-richblack-300">No Negative keywords</p>
                        )}
                </div>

                <div className="flex justify-center m-4">
                    <button
                        className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 mr-4"
                        onClick={() => navigate('/scrape/analysis')}
                    >
                        Back to Analysis
                    </button>
                    <button
                        className="bg-yellow-25 text-black py-2 px-4 rounded-md focus:outline-none hover:bg-yellow-50 mr-4"
                        onClick={() => navigate('/scrape')}
                    >
                        Back to Scrape
                    </button>
                </div>
            </div>

            <Footer />
        </React.Fragment>
    );
}

export default Summary;
