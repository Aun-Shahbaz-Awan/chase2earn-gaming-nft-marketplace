import React from 'react'

function LazyCollectionTypeCard() {
  return (
    <div className="bg-secondary p-3 mx-auto rounded-xl cursor-pointer hover:scale-105 hover:border border-sky-900 ease-in-out transition-all">
      <div
        className="rounded-xl bg-slate-600"
        width="350"
        height="350"
      />
      <div className="flex justify-between text-xs py-4 px-6 mb-1 mt-2  bg-primary rounded-xl">
        <div className="">
          <p className="text-gray_">Name</p>
          <p className="text-gray_">Total Tokens</p>
        </div>
        <div className="">
          <p>{category?.name}</p>
          <p>{category?.totalTokens}</p>
        </div>
      </div>
    </div>
  );
}

export default LazyCollectionTypeCard