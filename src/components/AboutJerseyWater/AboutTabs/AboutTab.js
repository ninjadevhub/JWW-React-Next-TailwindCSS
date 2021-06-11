import React from 'react'



const AboutTab = ({data}) => {

    return (
        <div className='flex flex-col items-center'>

            <div className='flex flex-col w-4/5 m-auto mt-12 mb-12'>
                <div className='flex justify-center mb-12'>
                    <p className='font-museo text-2xl text-brand-gray-typo'>{data.aboutTabHeading}</p>
                </div>
                <div>
                    <p className='font-nova text-xl text-brand-gray-typo'>{data.aboutTabText}</p>
                </div>
            </div>
            
            <div className='flex flex-row justify-between w-2/3'>
                <div className='w-1/3'>
                    <p className='font-nova text-xl text-brand-gray-typo'>{data.aboutTabBoxContent1}</p>
                </div>
                <div className='w-1/3'>
                    <p className='font-nova text-xl text-right text-brand-gray-typo'>{data.aboutTabBoxContent2}</p>
                </div>
            </div>

            <div className='bg-blue-200 border-b-2 border-brand-green w-2/3 m-auto h-24 mt-12'>

            </div>
            
            <div className=' bg-brand-orange w-1/3  justify-center  flex text-white mt-24'>
                <div className='pt-6 pb-6'>
                    <p className='font-museo text-center text-2xl '>{data.aboutTabSolutionsHeading}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-24 ">
              
                {data.aboutTabSolutions.map((item) => (
                    <div className='bg-brand-blue'>
                        <p className="text-white text-center font-museo text-base">{item.solution}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-24 border-4 border-brand-orange rounded-sm">
                <div className='p-1'>
                    <button  class="w-7/8 pt-4 bg-brand-orange font-nova text-base m-auto text-base	 text-white font-bold py-2 px-4 rounded">
                            {data.aboutTabSolutionsButtonText}
                    </button>
                </div>
                
            </div>
                    
        </div>
    )

}


export default AboutTab