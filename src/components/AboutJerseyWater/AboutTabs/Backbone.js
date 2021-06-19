import React, { useState } from "react"
import { FaAngleRight,FaAngleDown, } from "react-icons/fa";
//import Image from '../../image/index'
import Image from 'next/image';

const Backbone = ({data,dataLeadersSteering,src}) => {

    const [arrows,setArrows] = useState([]);
    const [showInfo,setShowInfo] = useState(false)

    const arrowHandler = (current) => {
    //console.log(current)

        if(arrows.includes(current)){
            setArrows(state => state.filter(id => id !== current));
            return
        }
        setArrows(state => [...state, current]);
    }
    //console.log(data)
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
                                                <div className="rounded-full">
                                                    <Image
                                                      src={item.backboneStaff?.profilePicture?.sourceUrl}
                                                      width={80}
                                                      height={80}
                                                      alt={(item.backboneStaff?.profilePicture?.altText || item.backboneStaff?.profilePicture?.title) ?? ''}
                                                    />
                                                </div>    
                                                <div className='flex flex-col ml-8'>
                                                    <div className='flex flex-row'>
                                                        <div>
                                                            <p className='text-brand-gray-typo'>{item.backboneStaff.firstName}</p>
                                                        </div>  
                                                        <div className='ml-4'>
                                                            <p className='text-brand-gray-typo'>{item.backboneStaff.lastName}</p>
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
                                                  <div style={{ width: 100, height: 80 }}>
                                                    <Image
                                                      src={item.backboneStaff?.workLogo?.sourceUrl}
                                                      layout="fill"
                                                      objectFit="cover"
                                                      alt={(item.backboneStaff?.workLogo?.altText || item.backboneStaff?.workLogo?.title) ?? ''}
                                                    />
                                                  </div>
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
                        <Image 
                        width={170}
                        height={70}
                        src={data.backboneStaffWork1Logo?.sourceUrl}
                        alt={(data.backboneStaffWork1Logo?.altText || data.backboneStaffWork1Logo?.title) ?? ''}
                        />
                    </div>
                    <div className='ml-4 flex items-center'>
                            <p>{data.backboneStaffWork1Text}</p>
                    </div>
                    
                </div>

                <div className='flex flex-row mt-12'>
                    <div className='w-40 flex flex items-center justify-center '>
                        <Image
                         width={180}
                         height={100}   
                         src={data.backboneStaffWork2Logo?.sourceUrl}
                         alt={(data.backboneStaffWork2Logo?.altText || data.backboneStaffWork2Logo?.title) ?? ''}
                         />
                    </div>
                    <div className='ml-4 flex items-center'>
                            <p>{data.backboneStaffWork2Text}</p>
                    </div>
                </div>
        </div>
    )
}

export default Backbone