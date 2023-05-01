// import React from 'react';

// const facts = [
// 	"Access to affordable and healthy food is essential for good health",
// 	"Housing conditions and stability can impact physical and mental health",
// 	"Employment and working conditions can impact health outcomes",
// 	"Education and literacy can affect health literacy and access to health care",
// 	"Environmental factors such as pollution can impact health outcomes",
// 	"Social and community support networks can positively impact health",
// 	"Access to health care services can impact health outcomes",
// 	"Race, ethnicity, and culture can impact health outcomes and health disparities",
// 	"Gender and sexual orientation can affect access to health care and health outcomes",
// 	"Income and wealth can affect access to health care and health outcomes"
//   ];

// function LoadingIcon({ loading }: { loading: boolean }): JSX.Element {
// 	return (
// 		<div
// 			className={`${
// 				loading ? '' : 'hidden'
// 			} flex justify-center items-center flex-col space-y-10 py-32 animate-pulse`}
// 		>
// 			{/* <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite' }} /> */}
// 			<div className='w-16 h-16 border-8 border-solid border-gray-300 border-t-8 border-t-blue-500 rounded-full animate-spin' />

// 			<p className='font-bold text-lg'>Loading...</p>
// 		</div>
// 	);
// }

// export default LoadingIcon;



import React, { useState, useEffect } from 'react';

const facts = [
	"Access to affordable and healthy food is essential for good health",
	"Housing conditions and stability can impact physical and mental health",
	"Employment and working conditions can impact health outcomes",
	"Education and literacy can affect health literacy and access to health care",
	"Environmental factors such as pollution can impact health outcomes",
	"Social and community support networks can positively impact health",
	"Access to health care services can impact health outcomes",
	"Race, ethnicity, and culture can impact health outcomes and health disparities",
	"Gender and sexual orientation can affect access to health care and health outcomes",
	"Income and wealth can affect access to health care and health outcomes"
];

function LoadingIcon({ loading }: { loading: boolean }): JSX.Element {
  const [factIndex, setFactIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setFactIndex(prevIndex => (prevIndex + 1) % facts.length);
        setFadeIn(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

	return (
		<div
			className={`${
				loading ? '' : 'hidden'
			} flex justify-center items-center flex-col space-y-10 py-32 animate-pulse`}
		>
			<div className='w-16 h-16 border-8 border-solid border-gray-300 border-t-8 border-t-blue-500 rounded-full animate-spin' />

			<p className={`font-thin italic text-xs transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>{`"${facts[factIndex]}"`}</p>
			<p className='font-bold text-lg'>Loading...</p>
		</div>
	);
}

export default LoadingIcon;
