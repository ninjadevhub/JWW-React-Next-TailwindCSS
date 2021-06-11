import React, { useState } from "react"
import { FaAngleRight,FaAngleDown, } from "react-icons/fa";


const Backbone = ({data,dataLeadersSteering}) => {

    const [arrows,setArrows] = useState([]);
    const [showInfo,setShowInfo] = useState(false)

    const arrowHandler = (current) => {
    console.log(current)

        if(arrows.includes(current)){
            setArrows(state => state.filter(id => id !== current));
            return
        }
        setArrows(state => [...state, current]);
    }
    console.log(data)
    return(
        <div className='flex flex-col mt-24 w-10/12 m-auto '>
                <div>
                    <p className='text-xl text-center font-nova text-brand-gray-typo'>{data.backboneStaffTabText}</p>
                </div>
                
                
                <div className='border-2 border-brand-table p-8 mt-16'>
                    <div>
                        <p className='text-2xl font-museo text-brand-gray-typo'>{data.backboneStaffTabBoxHeading}</p>
                    </div>
                    <div className=''>
                            {dataLeadersSteering.backboneStaffMembers.nodes.map((item,key) => (
                                <div className='flex flex-col'>
                                    <div className='flex flex-row justify-between mt-4 bg-brand-table p-6'>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row'>
                                                <div>
                                                    <img 
                                                    src={item.backboneStaff.profilePicture}/>
                                                </div>    
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-row'>
                                                        <div>
                                                            <p className='text-brand-gray-typo'>{item.backboneStaff.firstName}</p>
                                                        </div>  
                                                        <div className='ml-4'>
                                                            <p className='text-brand-gray-typo'>{item.backboneStaff.lastName}</p>
                                                        </div>    
                                                    </div>    
                                                </div>    
                                            
                                            </div>   
                                            <div className='flex flex-row'>
                                                <div>
                                                    <p className='font-nova text-xl text-brand-gray-typo'>{item.backboneStaff.title}</p>
                                                </div> 
                                                <div className='ml-4'>
                                                    <a className='font-nova text-xl text-brand-blue' href={`${item.backboneStaff.linkUrl}`}>{item.backboneStaff.linkText}</a>
                                                </div>    
                                            </div>  
                                        </div>   

                                        <div className='flex items-center'>
                                            <div onClick={() => arrowHandler(item.backboneStaffMemberId)}>
                                            {!arrows.includes(item.backboneStaffMemberId) ? <FaAngleRight /> : <FaAngleDown />}
                                            </div>  
                                        </div>
                                    </div>   


                                    {arrows.includes(item.backboneStaffMemberId) ?
                                          <div className='bg-brand-form-bg1 p-8 flex flex-col border-b-4 border-brand-borderB-color'>
  
                                          <div className='flex flex-row mt-4'>
                                              <div className='w-40 flex flex items-center  '>
                                                   <img src={item.backboneStaff.workLogo.sourceUrl} />
                                              </div>
                                              <div className='flex items-center ml-4'>
                                                   <p className='font-nova text-brand-gray-typo text-xl'>{item.backboneStaff.workText}</p>
                                              </div>     
                                          </div>    
                                      </div>   
                                      : null
                                    }
                                   

                                </div>
                            ))}

                    </div>

                </div>

                <div className='flex flex-row mt-12'>
                    <div className='w-40 	'>
                        <img src={data.backboneStaffWork1Logo.sourceUrl} />
                    </div>
                    <div className='ml-4 flex items-center'>
                            <p>{data.backboneStaffWork1Text}</p>
                    </div>
                    
                </div>

                <div className='flex flex-row mt-12'>
                    <div className='w-40 flex flex items-center justify-center '>
                        <img src={data.backboneStaffWork2Logo.sourceUrl} />
                    </div>
                    <div className='ml-4 flex items-center'>
                            <p>{data.backboneStaffWork2Text}</p>
                    </div>
                </div>
        </div>
    )
}

export default Backbone