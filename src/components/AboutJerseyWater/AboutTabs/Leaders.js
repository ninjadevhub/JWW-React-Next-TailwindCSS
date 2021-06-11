import { data } from "autoprefixer"
import React from "react"



const Leaders = ({data}) => {

    return (
        <div className='flex flex-col w-4/5 m-auto'>
            <div className='flex justify-center mt-12'>
                <p className='text-xl font-nova text-brand-gray-typo'>{data.committeeMembersHeading}</p>
            </div>

            <div className='border-2 border-brand-table'>
                <div className='p-8'>
                    <div className='bg-brand-table p-8'>
                           <p className='text-2xl font-nova text-brand-gray-typo'>{data.honoraryCoChairsHeading}</p>
                    </div>
                {data.honoraryCoChairs.map((item) => (
                    <div className='flex flex-row bg-brand-table '>
                        <div className='w-1/6 ml-4 mb-12'>
                           <img 
                           src={item.coChairProfilePicture.sourceUrl}/>
                        </div>
                        <div className=''>
                            <div>
                              <p className='text-base text-brand-gray-typo font-museo'>{item.coChairName}</p>
                            </div>
                            <div>
                              <p className='text-base text-brand-gray-typo font-museo'>{item.coChairTitles}</p>
                            </div>       
                        </div>
                    </div>    
                ))}
                </div>
            </div>

            <div className='border-2 border-brand-table mt-6 p-8'>
                <div className='bg-brand-table p-8 mt-8'>
                    <div className='mb-8'>
                        <p className='font-museo text-brand-gray-typo text-2xl'>{data.steeringCommitteeHeading}</p>
                    </div>
                    <div>
                        <p className='font-nova text-brand-gray-typo text-xl'>{data.steeringCommitteeText}</p>
                    </div>
                    <div className='mt-8'>
                    {data.committeeRoles.map((item) => (
                        <div className='flex flex-row bg-white mt-2 p-2 items-center'>
                            <div>
                                <img 
                                src={item.roleIcon.sourceUrl}/>
                            </div>  
                            <div className='pl-4'>
                                <p className='font-museo text-brand-gray-typo text-xl'>{item.role}</p>
                            </div>   
                        </div>    
                    ))}
                </div>
                </div>
            </div>

         

        </div>
    )
}

export default Leaders