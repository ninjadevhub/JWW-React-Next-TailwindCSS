import { data } from "autoprefixer"
import React from "react"
import Image from 'next/image';
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

const Goals = ({data}) => {
    
    return(
        <div className='goals-content'>
            <div className='flex flex-col'>
                <div className='flex justify-center mt-14'>
                    <p className='text-2xl text-center text-brand-gray-typo'>{data.goalsTabHeading}</p>
                </div>
                <div className='flex justify-center mt-14'>
                    <p className='text-xl text-center text-brand-gray-typo'>{data.goalsTabText}</p>
                </div>
                <div className='flex justify-center mt-2'>
                    <button class="w-1/3 pt-2 bg-brand-orange font-nova text-base m-auto text-base text-white font-bold py-2 px-4 rounded">{data.goalsTabButtonText}</button>
                </div>
            </div>
            <div className='goals-card-wrap mt-14'>
                <div className='goals-card-item'>
                    <div className='goals-card-inner'>
                        <div className='goals-card-content'>
                            <div className='goals-card-icon'><Image src="/images/about/icon-goal1.png" width="89" height="89" /></div>
                            <h2 className='goals-card-title'>To create effective and financially sustainable systems.</h2>
                            <p className='goals-card-text'>JWW empowers communities to maintain and improve drinking water, wastewater and stormwater infrastructure systems to deliver quality water services that meet community needs. Operating budgets and capital investment are adequate and affordable, resulting in systems that operate efficiently and in a state of good repair.</p>
                            <div className='goals-list'>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Maintaining Systems</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Utilities and departments maintain drinking water, wastewater and stormwater pipes and other water infrastructure assets to efficiently and effectively reduce leakage, emergency repairs and other impacts.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Wise Management and Spending</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            State requirements, metrics, and incentives along with utility policies ensure that utilities and departments implement water infrastructure asset management programs fully, with sufficient operating budgets and capital investments to deliver required and desired levels of service while minimizing life-cycle costs.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Adequate and Fair Revenue</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Utilities and local governments raise the funds required to make appropriate capital investments and ensure proper operation and maintenance in a cost-effective, equitable manner that treats ratepayers fairly. Programs are authorized and established to ensure affordability. Stormwater utilities and stormwater fees are authorized statewide and widely implemented.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Robust Government Funding Initiatives</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Funding for existing federal water infrastructure financing program is maintained or increased. New state funding for water infrastructure programs advances Jersey Water Works’ goals.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='goals-card-item'>
                    <div className='goals-card-inner'>
                        <div className='goals-card-content'>
                            <div className='goals-card-icon'><Image src="/images/about/icon-goal2.png" width="89" height="89" /></div>
                            <h2 className='goals-card-title'>To bring together people who care so that we can make a difference as a team.</h2>
                            <p className='goals-card-text'>JWW unites well-informed decision makers, community partners, residents and ratepayers so that they can influence the planning and management of their water infrastructure. Our stakeholders fully understand the importance of taking care of water infrastructure, including the costs of inaction.</p>
                            <div className='goals-list'>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Educated Stakeholders</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Stakeholders are educated on problems and are fluent in challenges and solutions.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Engaged Communities</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Stakeholders actively engage in a meaningful process to influence decision-making in order to ensure sound drinking water, wastewater, and stormwater infrastructure.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Holistic Water Systems</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Municipal master plans, neighborhood plans, ordinances, policies, programs and projects will: reflect stakeholder priorities for water resources and water infrastructure while addressing regulatory requirements; maximize short- and long-term community benefits; and be integrated into local asset management programs.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Transparent Water Systems</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Utilities provide, and state agencies publish, simple metrics of system condition and utility finances that aid in public understanding of utility management and status.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='goals-card-item'>
                    <div className='goals-card-inner'>
                        <div className='goals-card-content'>
                            <div className='goals-card-icon'><Image src="/images/about/icon-goal3.png" width="89" height="89" /></div>
                            <h2 className='goals-card-title'>To form successful and be­neficial green infrastructure.</h2>
                            <p className='goals-card-text'>JWW sets communities up with green infrastructure in order to maximize community benefits, including reduced flooding and improved water quality, local economies, community health and long-term resiliency.</p>
                            <div className='goals-list'>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Installing Green Infrastructure</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            The public and private sectors integrate green stormwater infrastructure into new projects, redevelopment projects, and existing facilities.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Reducing Flooding</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Utilities and government departments employ green infrastructure to reduce flooding caused by inadequate wastewater and stormwater systems.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='goals-card-item'>
                    <div className='goals-card-inner'>
                        <div className='goals-card-content'>
                            <div className='goals-card-icon'><Image src="/images/about/icon-goal4.png" width="89" height="89" /></div>
                            <h2 className='goals-card-title'>To establish smart combined sewer overflow control plans.</h2>
                            <p className='goals-card-text'>JWW guides municipalities and utilities in the adoption of innovative CSO Long Term Control Plans (LTCPs) with cost-effective solutions that meet or exceed permit requirements and provide multiple community benefits.</p>
                            <div className='goals-list'>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Balancing Pipes and Parks</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            LTCPs incorporate and commit to an optimized balance of green and gray infrastructure to achieve the goals of the Clean Water Act.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Reducing Combined Sewer Flows</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            LTCPs prioritize proven approaches that reduce combined sewer system flows, such as inflow and infiltration (I & I) reduction, green stormwater infrastructure and water conservation.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Serving Host Communities</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                            Implementation of the LTCPs reflects early input of community stakeholders and delivers significant additional community benefits including improved public health, green space, economic revitalization, and local jobs.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<span className="fas fa-chevron-right" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>Affordable Combined Sewer Overflow (CSO) Solutions</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="content">
                                        CSO LTCPs help ensure affordability for all ratepayers by using cost-effective overflow-reduction strategies, state and federal funding assistance, equitable rate structures, innovative financing mechanisms, appropriate implementation schedules and leveraging of other public and private investments.
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goals