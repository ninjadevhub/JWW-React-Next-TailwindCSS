import React from 'react'
import client from '../../src/apollo/client';
import AboutJerseyWater from '../../src/components/AboutJerseyWater/AboutJerseyWater';
import Layout from '../../src/components/layout'
import { GET_ABOUT_JERSEY_WATER } from '../../src/queries/about/about';





export default function Leaders ({data}) {

    const { about: jerseydata } = data.pageBy;

      //console.log("-------------------",data)
    return (
        
        <Layout data={data}>
          <AboutJerseyWater  data={jerseydata} dataLeadersSteering={data} activeTab="Leaders" />
        </Layout>

    )

}


export async function getStaticProps(context) {

    const { data, errors } = await client.query({
      query: GET_ABOUT_JERSEY_WATER ,
      variables: {
        uri: '/about/',
      },
    });
  
    const defaultProps = {
      props: {
        data: data || {},
      },
      revalidate: 60,
    };
  
    return defaultProps;
  }
