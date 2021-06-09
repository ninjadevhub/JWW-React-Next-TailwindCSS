import { useRouter } from 'next/router';
import React from 'react'
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';
import client from '../../src/apollo/client';
import GetInvolved from '../../src/components/GetInvolved/GetInvolved';
import Layout from '../../src/components/layout'
import { GET_INVOLVED } from '../../src/queries/involved/involved';


SwiperCore.use([Autoplay, Pagination, EffectFade, A11y]);



export default function Water101 ({data}) {

  const { getInvolved: dataInvovled } = data.pageBy;


    return (
        
        <Layout data={data}>
          <GetInvolved  dataInvovled = {dataInvovled}/>
        </Layout>

    )

}


export async function getStaticProps(context) {

    const { data, errors } = await client.query({
      query: GET_INVOLVED,
      variables: {
        uri: '/get-involved/',
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
