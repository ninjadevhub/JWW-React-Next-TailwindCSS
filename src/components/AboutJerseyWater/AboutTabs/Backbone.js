import React, { useState } from "react"
import Image from 'next/image';
import { FaAngleRight,FaAngleDown, } from "react-icons/fa";
import { sanitize } from '../../../utils/miscellaneous';

import MuiAccordion from '@material-ui/core/Accordion';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';


const Accordion = withStyles({
    root: {
        margin: '0.5rem 0 !important',
        boxShadow: 'none',
        '&$expanded': {
            margin: '0.5rem 0 !important',
        },
    },
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        minHeight: '4rem !important',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        backgroundColor: '#e5e5e5',
        fontSize: '1.5rem',
    },
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
    root: {
        backgroundColor: '#f3f3f3',
        paddingTop: '1rem',
        paddingRight: '5rem',
        paddingLeft: '5rem',
    },
})(MuiAccordionDetails);


const Backbone = ({data,dataLeadersSteering, src}) => {

    const [arrows, setArrows] = useState([]);
    const [showInfo, setShowInfo] = useState(false)

    const arrowHandler = (current) => {
        if(arrows.includes(current)){
            setArrows(state => state.filter(id => id !== current));
            return
        }
        setArrows(state => [...state, current]);
    }
    
    return(
        <div className='flex flex-col mt-24 w-10/12 m-auto'>
            <div>
                <p className='text-xl text-center font-nova text-brand-gray-typo'>{data.backboneStaffTabText}</p>
            </div>
            <div className='border-2 border-brand-table p-8 mt-16'>
                <div>
                    <p className='text-2xl font-museo text-brand-gray-typo'>{data.backboneStaffTabBoxHeading}</p>
                </div>
                <div>
                    {dataLeadersSteering.backboneStaffMembers.nodes.map((item,key) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<span className="fas fa-chevron-right" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className='flex flex-col'>
                                    <div className='flex flex-row items-center'>
                                        <div className='jww-bbs-avatar rounded-full text-0'>
                                            <Image
                                                src={item.backboneStaff?.profilePicture?.sourceUrl ? item.backboneStaff?.profilePicture?.sourceUrl : '/images/about/profile-image.png'}
                                                width={80}
                                                height={80}
                                                alt={(item.backboneStaff?.profilePicture?.altText || item.backboneStaff?.profilePicture?.title) ?? ''}
                                            />
                                        </div>
                                        <div className='flex flex-col ml-8'>
                                            <div className='flex flex-row'>
                                                <p className='font-museo text-xl text-brand-gray-typo text-uppercase'>{item.backboneStaff.firstName} {item.backboneStaff.lastName}</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <p className='font-nova text-xl text-brand-gray-typo'>{item.backboneStaff.title}, <a className='font-nova text-xl text-brand-blue' href={`${item.backboneStaff.linkUrl}`}>{item.backboneStaff.linkText}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='bg-brand-form-bg1 p-8 flex flex-col border-b-4 border-brand-borderB-color'>

                                    <div className='font-nova text-brand-gray-typo text-xl'
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize(
                                                item.backboneStaff?.staffBio ?? ''
                                            ),
                                        }}
                                    />

                                    {item.backboneStaff?.workplace?.includes('Jersey Water Works') &&
                                    <div className='flex flex-row items-center mt-8 pt-8 border-t-1'>
                                        <div className='flex'>
                                            <Image
                                                src="/images/jersey-water-works-logo.png"
                                                width={153}
                                                height={60}
                                                alt="Jersey Water Works"
                                            />
                                        </div>
                                        <div className='flex ml-4'>
                                            <div className='font-nova text-brand-gray-typo text-xl'
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitize(
                                                        item.backboneStaff?.roleAtJww ?? ''
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>}
                                    {item.backboneStaff?.workplace?.includes('New Jersey Future') &&
                                    <div className='flex flex-row items-center mt-8 pt-8 border-t-1'>
                                        <div className='flex'>
                                            <Image
                                                src="/images/new-jersey-future-logo.png"
                                                width={100}
                                                height={80}
                                                alt="New Jersey Future"
                                            />
                                        </div>
                                        <div className='flex ml-4'>
                                            <div className='font-nova text-brand-gray-typo text-xl'
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitize(
                                                        item.backboneStaff?.roleAtNjf ?? ''
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>

            <div className='flex flex-row items-center mt-12'>
                <div className='jww-bbs-logos-image flex justify-center'>
                    <Image 
                        width={153}
                        height={60}
                        src={data.backboneStaffWork1Logo?.sourceUrl}
                        alt={(data.backboneStaffWork1Logo?.altText || data.backboneStaffWork1Logo?.title) ?? ''}
                    />
                </div>
                <div className='jww-bbs-logos-text ml-8 text-xl'>
                    <p>{data.backboneStaffWork1Text}</p>
                </div>
            </div>

            <div className='flex flex-row items-center mt-12'>
                <div className='jww-bbs-logos-image flex justify-center'>
                    <Image
                        width={100}
                        height={80}
                        src={data.backboneStaffWork2Logo?.sourceUrl}
                        alt={(data.backboneStaffWork2Logo?.altText || data.backboneStaffWork2Logo?.title) ?? ''}
                    />
                </div>
                <div className='jww-bbs-logos-text ml-8 text-xl'>
                    <p>{data.backboneStaffWork2Text}</p>
                </div>
            </div>
        </div>
    )
}

export default Backbone