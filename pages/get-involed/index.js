import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';
import client from '../../src/apollo/client';
import GetInvolved from '../../src/components/Get-Involved/GetInvoled';
import Layout from '../../src/components/layout'

import { GET_INVOLVED} from '../../src/queries/get-involved/get-involved';


SwiperCore.use([Autoplay, Pagination, EffectFade, A11y]);



export default function Water101 ({data}) {

  const { water101: dataInvovled } = data.pageBy;


 const router = useRouter();

    return (
        
        <Layout data={dataInvovled}>
            <GetInvolved/>
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
