import React from "react"
import { FaAngleRight } from "react-icons/fa";
import Image from '../../image/index'
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

const Members = ({data}) => {

    return(
        <div className='flex flex-col'>
            <div className='flex w-4/5 m-auto mt-16'>
                <p className='text-2xl text-center text-brand-gray-typo'>{data.membersHeading}</p>
            </div>
            
            <div className='flex flex-row justify-between w-3/5 m-auto mt-16'>
                <div className='w-2/5 bg-brand-orange justify-center flex'>
                    <button className="font-nova text-base m-auto text-base text-white rounded">
                        {data.membersButton1Text}
                    </button>
                </div>
                <div className='w-2/5 bg-brand-orange justify-center flex p-2'>
                    <button className="font-nova text-base m-auto text-base text-white rounded">
                        {data.membersButton2Text}
                    </button>
                </div>
            </div>

            <div className='flex w-4/5 m-auto mt-20 mb-10'>
                <p className='text-center font-museo text-xl text-brand-gray-typo'>Jersey Water Works is a collaborative effort of many diverse organizations and individuals who embrace the common purpose of transforming New Jersey’s inadequate water infrastructure. Members work together across boundaries to support, endorse and implement strategies identified by the collaborative.</p>
            </div>

            <div className='members-chart text-center mb-10'>
                <Image src="/images/about/members-chart.png" width="697" height="692" />
            </div>

            <div className='w-4/5 m-auto border-2 border-brand-table p-4'>
                {data.members.map((item) => (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<span className="fas fa-chevron-right" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <span>{item.memberHeading}</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="content">{item.memberText}</div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

        </div>
    )
}

export default Members