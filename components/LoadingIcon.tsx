import React from 'react';

function LoadingIcon({loading}: {loading: boolean}): JSX.Element {
  return (
    <div className={`${loading ? '' : 'hidden'} flex justify-center items-center flex-col space-y-10 py-32 animate-pulse`}>
      {/* <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite' }} /> */}
      <div className="w-16 h-16 border-8 border-solid border-gray-300 border-t-8 border-t-blue-500 rounded-full animate-spin" />

      <p className='font-bold text-lg'>Loading</p>
    </div>
  );
}

export default LoadingIcon;
