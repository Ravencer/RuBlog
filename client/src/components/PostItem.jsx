import React from 'react';

export const PostItem = () => {
    return <div 
    className='flex flex-col basis-1/4 flex-grow'>
        <div>IMAGE</div>
        <div className='flex justify-between items-center pt-2'>
            <div className=''>USERNAME</div>
            <div>DATA</div>
        </div>
    </div>;
};