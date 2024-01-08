import React from 'react'

export const MainPage = () => {
  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className="flex justify-between gap-8">
        <div clasName='flex flex-col gap-10 basis-4/5'>
          POSTS
        </div>
        <div className="basis-1/5">
          <div className='text-sm uppercase text-lime-700'>
            Популярное:
          </div>
          POPULAR POSTS
        </div>
      </div>
    </div>
  )
}
