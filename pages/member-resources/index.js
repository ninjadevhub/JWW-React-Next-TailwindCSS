import Image from 'next/image'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import client from 'src/apollo/client'
import Layout from 'src/components/layout'
import Button from 'src/components/Button/Button'
import { sanitize } from 'src/utils/miscellaneous'
import { GET_MEMBER_RESOURCES_PAGE } from 'src/queries/pages/get-member-resources-page'

const MemberResources = ({ data }) => {
  console.log(data)

  return (
    <Layout data={data}>
      <div className='relative w-full bg-brand-gray' style={{ height: 430 }}>
        <div className='relative w-full' style={{ height: 430 }}>
          <Image
            src={data.page.memberResources.headerImage.sourceUrl ?? ''}
            alt={
              data.page.memberResources.headerImage.altText ||
              data.page.memberResources.headerImage.title
            }
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='w-150 max-w-full absolute right-24 top-1/2 z-10 bg-white p-6 pointer-events-none text-center transform -translate-y-1/2'>
          <h1 className='mb-5 text-center text-3xl'>Member Resources</h1>
          <p>
            These resources are intended for use by <br /> Jersey Water Works
            supporting members.
          </p>
        </div>
      </div>
      <div className='mt-8 w-4/5 mx-auto border p-8'>
        <Accordion
          allowMultipleExpanded
          allowZeroExpanded
          className='space-y-1'
        >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion1Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <div class='grid grid-cols-3 gap-4'>
                <div>
                  <div className='h-60 relative'>
                    <Image
                      src={
                        data.page.memberResources.accordion1Card1Image
                          .sourceUrl ?? ''
                      }
                      alt={
                        data.page.memberResources.accordion1Card1Image
                          .altText ||
                        data.page.memberResources.accordion1Card1Image.title
                      }
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='h-32 flex items-center justify-center text-center bg-brand-orange px-8'>
                    <p className='font-museo text-xl text-white'>
                      {data.page.memberResources.accordion1Card1Heading}
                    </p>
                  </div>
                </div>
                <div>
                  <div className='h-60 relative'>
                    <Image
                      src={
                        data.page.memberResources.accordion1Card2Image
                          .sourceUrl ?? ''
                      }
                      alt={
                        data.page.memberResources.accordion1Card1Image
                          .altText ||
                        data.page.memberResources.accordion1Card1Image.title
                      }
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='h-32 flex items-center justify-center text-center bg-brand-blue px-8'>
                    <p className='font-museo text-xl text-white'>
                      {data.page.memberResources.accordion1Card2Heading}
                    </p>
                  </div>
                </div>
                <div>
                  <div className='h-60 relative'>
                    <Image
                      src={
                        data.page.memberResources.accordion1Card3Image
                          .sourceUrl ?? ''
                      }
                      alt={
                        data.page.memberResources.accordion1Card1Image
                          .altText ||
                        data.page.memberResources.accordion1Card1Image.title
                      }
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='h-32 flex items-center justify-center text-center bg-brand-teal px-8'>
                    <p className='font-museo text-xl text-white'>
                      {data.page.memberResources.accordion1Card3Heading}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion2Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion3Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion4Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion5Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion6Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion7Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className='bg-gray-200 px-8 py-4 accordion__button'>
                <p className='font-museo text-2xl text-brand-gray-typo'>
                  {data.page.memberResources.accordion1Heading}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='px-12 py-8'>
              <p>
                Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                occaecat ut occaecat consequat est minim minim esse tempor
                laborum consequat esse adipisicing eu reprehenderit enim.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='w-4/5 mx-auto mt-12 p-12 bg-brand-blue'>
        <div className='grid grid-cols-2'>
          <div>
            <div className='h-80 relative'>
              <Image
                src={data.page.memberResources.bottomPanelImage.sourceUrl ?? ''}
                alt={
                  data.page.memberResources.bottomPanelImage.altText ||
                  data.page.memberResources.bottomPanelImage.title
                }
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
          <div className='pl-16'>
            <p className='mb-8'>
              {data.page.memberResources.bottomPanelHeading}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(data.page.memberResources.bottomPanelContent),
              }}
            />
            <Button color='brand-orange' uri='#'>
              {data.page.memberResources.bottomPanelButtonText}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { data, errors } = await client.query({
    query: GET_MEMBER_RESOURCES_PAGE,
    variables: {
      uri: '/member-resources/',
    },
  })

  const defaultProps = {
    props: {
      data: data || {},
    },
    revalidate: 60,
  }

  return defaultProps
}

export default MemberResources
