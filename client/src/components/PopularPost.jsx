import React from 'react'



export const PopularPost = ({post}) => {
  return (
    <div className='bg-orange-100 my-1'>
        <div className='flex text-sm p-2 text-lime-500 hover:bg-orange-300 hover:text-lime-700'>
            {post.headline}
        </div>
    </div>
  )
}
