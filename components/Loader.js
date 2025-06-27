import React from 'react'
import { DNA } from 'react-loader-spinner'


const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-70">
                    <DNA
                      visible={true}
                      height="100"
                      width="100"
                      color="red"
                      secondaryColor="yellow"
                      radius="12"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      />
                      </div>
    </>
  )
}

export default Loader
