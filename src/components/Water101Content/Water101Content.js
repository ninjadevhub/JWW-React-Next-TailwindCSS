import React, { useState} from "react"
import Water101Individual from "./Water101Tabs/Water101Individual";
import Water101Businesses from "./Water101Tabs/Water101Businesses";
import Water101Municpalities from "./Water101Tabs/Water101Municpalities";

const tabs = {
    individuals: 'Individuals',
    businesses: 'Businesses',
    municipalities: 'Municipalities',
}

const Water101Content = ({dataWater,}) => {
    const [activeTab, setActiveTab] = useState(tabs.individuals);

        return(
            <div>
                <div className="flex flex-col jutify-center items-center" 
                style={{backgroundImage:`url(${dataWater?.headerImage?.sourceUrl})`,
                        width:'100%',
                        height:'320px',
                    }}
                    
                >   
                    <div className="flex flex-col  m-auto content-center jutify-center items-center  bg-white w-2/4">
                        <p className='mt-6 mb-6 font-museo text-3xl text-brand-gray-typo '>Water 101</p>
                        <p className='text-xl mb-6 ml-2 font-nova text-brand-gray-typo'>
                            Fixing broken water infrastructure is a daunting task. The problems are too big for any one 
                            person or organization to tackle alone, which is why Jersey Water Works
                        </p>
                    </div>
                </div>
            
                <div className='flex flex-row justify-center items-center bg-brand-gray h-12 w-full font-nova text-base'>
                    <div 
                    className='w-52 flex justify-center active:bg-green-700'
                    >
                        <a className='cursor-pointer' onClick={() => setActiveTab(tabs.individuals)}>INDIVIDUALS</a>
                    </div>
                    <div className='w-52 flex justify-center'>
                        <a className='cursor-pointer' onClick={() => setActiveTab(tabs.businesses)}>BUSINESSES</a>
                    </div>
                    <div className='w-52 flex justify-center'>
                        <a className='cursor-pointer' onClick={() => setActiveTab(tabs.municipalities)}>MUNICIPALITIES</a>
                    </div>
                </div>

                    {activeTab === tabs.businesses && <Water101Businesses dataWater={dataWater}/> }
                    {activeTab === tabs.individuals && <Water101Individual dataWater={dataWater} /> }
                    {activeTab === tabs.municipalities && <Water101Municpalities dataWater={dataWater} /> }
            </div>
        )


}

export default Water101Content