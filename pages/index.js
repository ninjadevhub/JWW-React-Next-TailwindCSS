import client from '../src/apollo/client';
import Layout from '../src/components/layout';
import {sanitize} from '../src/utils/miscellaneous';
import {GET_HOME_PAGE} from '../src/queries/home/home';
import HomeContent from '../src/components/HomeContent/HomeContent';

//import {handleRedirectsAndReturnData} from '../src/utils/slug';

export default function Home( {data} ) {

	
	return (
		<Layout data={data}>
			<div dangerouslySetInnerHTML={{__html: sanitize( data?.page?.content ?? '' )}}/>
			<HomeContent data={data}/>
		</Layout>
	);
}

export async function getStaticProps( context ) {

	const { data, errors } = await client.query( {
		query: GET_HOME_PAGE,
		variables: {
			uri: '/',
		},
	} );

	const defaultProps = {
		props: {
			data: data || {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 60,
	};

	return defaultProps;

	//return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
