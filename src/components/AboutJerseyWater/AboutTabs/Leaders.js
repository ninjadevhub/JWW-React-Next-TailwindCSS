import React from "react"
import Image from '../../image/index'


const Leaders = ({data,dataLeadersSteering}) => {

    return (
        <div className='flex flex-col'>
            <div className='flex w-4/5 m-auto justify-center mt-12'>
                <p className='font-nova text-brand-gray-typo text-xl text-center'>{data.leadersTabText}</p>
            </div>

            <div className='border-2 border-brand-table mt-12'>
                <div className='p-8'>
                    <div className='bg-brand-table p-8'>
                        <p className='font-museo text-brand-gray-typo text-2xl'>{data.honoraryCoChairsHeading}</p>
                    </div>
                    {data.honoraryCoChairs.map((item) => (
                        <div className='flex flex-row bg-brand-table'
                            //{`${data.honoraryCoChairs.length-1 ? 'className='border-none'' : ''}`}
                        >
                            <div className='ml-8 mr-8 mb-12'>
                                <Image width={60} height={60} sourceUrl={item.coChairProfilePicture.sourceUrl} />
                            </div>
                            <div>
                                <p className='text-base text-brand-gray-typo font-museo text-uppercase'>{item.coChairName}</p>
                                <p className='text-base text-brand-gray-typo font-nova text-xl'>{item.coChairTitles}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='border-2 border-brand-table mt-8 p-8'>
                <div className='bg-brand-table p-8'>
                    <div className='mb-8'>
                        <p className='font-museo text-brand-gray-typo text-2xl'>{data.steeringCommitteeHeading}</p>
                    </div>
                    <div>
                        <p className='font-nova text-brand-gray-typo text-xl'>{data.steeringCommitteeText}</p>
                    </div>
                    <div className='mt-8'>
                        {data.committeeRoles.map((item) => (
                            <div className='flex flex-row bg-white mt-2 p-2 items-center'>
                                <div className='jww-icon flex item-center'>
                                    <Image width={50} height={45} sourceUrl={item.roleIcon.sourceUrl} />
                                </div>
                                <div className='pl-4'>
                                    <p className='font-museo text-brand-gray-typo text-xl text-uppercase'>{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='border-2 border-brand-table mt-8 p-8'>
                <div className="bg-brand-table p-8">
                    <div className='mb-8'>
                        <p className='font-museo text-brand-gray-typo text-2xl'>{data.committeeMembersHeading}</p>
                    </div>
                    <div className="grid grid-cols-2">
                        {dataLeadersSteering.steeringCommitteeMembers.nodes.map((item) =>(
                            <div className='jww-scm-item flex flex-row pt-8 pb-8'>
                                <div className='mr-8'>
                                    <Image sourceUrl={`${item.committeeMember.profileImage ? item.committeeMember.profileImage : '/images/about/profile-image.png'}`} width="75" height="75" />
                                </div>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col'>
                                        <p className='flex flex-row font-museo text-xl text-brand-gray-typo text-uppercase'>{item.committeeMember.firstName} {item.committeeMember.lastName}</p>
                                        <div className='font-nova text-xl text-brand-gray-typo'>
                                            <p>{item.committeeMember.title}</p>
                                        </div>
                                        <div className='font-nova text-xl text-brand-gray-typo'>
                                            <a className='text-blue-600 text-brand-blue' href={`${item.committeeMember.workplaceLinkUrl}`}>{item.committeeMember.workplaceLinkText}</a>
                                        </div>
                                    </div>
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