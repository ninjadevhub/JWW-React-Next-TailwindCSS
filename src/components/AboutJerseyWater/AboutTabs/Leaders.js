import { data } from "autoprefixer"
import React from "react"



const Leaders = ({data,dataLeadersSteering}) => {

    return (
        <div className='flex flex-col w-4/5 m-auto'>
            <div className='flex justify-center mt-12'>
                <p className='text-xl text-center font-nova text-brand-gray-typo'>{data.leadersTabText}</p>
            </div>

            <div className='border-2 border-brand-table mt-12'>
                <div className='p-8'>
                    <div className='bg-brand-table p-8'>
                           <p className='text-2xl font-nova text-brand-gray-typo'>{data.honoraryCoChairsHeading}</p>
                    </div>
                {data.honoraryCoChairs.map((item) => (
                    <div className='flex flex-row bg-brand-table  border-b-2 border-brand-green '
                        //    { `${data.honoraryCoChairs.length-1 ? 'className='border-none'' : ''}`}
                    >
                        <div className='w-1/6 ml-4 mb-12'>
                           <img 
                           src={item.coChairProfilePicture.sourceUrl}/>
                        </div>
                      
                        <div className=''>
                            <div>
                              <p className='text-base text-brand-gray-typo font-museo '>{item.coChairName}</p>
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
                            <div className=' flex item-center'>
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


            <div className='border-2 border-brand-table mt-6 p-8 '>
                <div className="bg-brand-table w-full grid grid-cols-2 gap-4 p-8 ">

                {dataLeadersSteering.steeringCommitteeMembers.nodes.map((item) =>(
                    <div className='flex flex-row'>

                        <div>
                            <img src={`${item.committeeMember.profileImage}`} />
                        </div>

                        <div className='flex flex-row'>
                            <div>

                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row font-museo text-xl text-brand-gray-typo'>
                                    <div>
                                        <p>{item.committeeMember.firstName}</p>
                                    </div>
                                    <div>
                                        <p>{item.committeeMember.lastName}</p>
                                    </div>        
                                </div>
                                <div className='font-nova text-xl text-brand-gray-typo'>
                                    <p>{item.committeeMember.title}</p>
                                </div>
                                <div className='font-nova text-xl text-brand-gray-typo text-brand-blue'>
                                    <a className='underline text-blue-600' href={`${item.committeeMember.workplaceLinkUrl}`}>{item.committeeMember.workplaceLinkText}</a>
                                </div>    

                            </div>    
                        </div>    
                    </div>    
                ))}
                </div>

            </div>

         

        </div>
    )
}

export default Leaders