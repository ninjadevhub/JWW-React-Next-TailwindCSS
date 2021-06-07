import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';


import client from '../../src/apollo/client';
import Layout from '../../src/components/layout'
import Water101Content from '../../src/components/Water101Content/Water101Content';

import { GET_WATER_101} from '../../src/queries/water101/get-water101';


SwiperCore.use([Autoplay, Pagination, EffectFade, A11y]);



export default function Water101 ({data}) {

  const { water101: dataWater } = data.pageBy;


 const router = useRouter();

    return (
        
        <Layout data={dataWater}>
            <Water101Content dataWater={dataWater} />
        </Layout>

    )

}


export async function getStaticProps(context) {

    const { data, errors } = await client.query({
      query: GET_WATER_101,
      variables: {
        uri: '/water-101/',
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
