import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getTopicIconByName, getTypeIconByName, getCommitteeIconsByName } from '../../utils/icons-map';
import { convertAmpersands } from '../../utils/miscellaneous';

const Resource = ({ hit, committees,onCardClick }) => {
  console.log("resource",hit)
  const {
    post_date,
    images,
    taxonomies_topic,
    taxonomies_jww_type,
    post_title,
    post_excerpt,
    content,
    objectID
  } = hit;

  const resourceLink = content.match(/<a href="([^"]+)(?!<a href=")/)?.[1] ?? '';
  return (
    <div className="w-full flex border-solid border-b border-color-brand-gray text-gray-700">
      <div
        className="relative flex-grow-0 flex-shrink-0 mb-10"
        style={{ flexBasis: '292px', maxWidth: 292, height: 362 }}
      >
        {images?.full?.url ? (
          <Image
            src={images.full.url}
            alt={(images.full.alt || images.full.title) ?? ''}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-brand-gray"></div>
        )}
        {Date.now() - post_date * 1000 < 61 * 24 * 60 * 60 * 1000 && (
          <div className="absolute left-4 top-4">
            <Image src="/images/new.svg" width={49} height={49} />
          </div>
        )}
      </div>
      <div className="flex-1 pt-3 px-6">
        <div className="flex justify-between text-xs">
          <div className="flex">
            {taxonomies_topic?.length > 0 && (
              <div className="mr-6">
                {taxonomies_topic?.map((t) => (
                  <div className="flex items-center pb-2">
                    <div className="mr-3">{getTopicIconByName(t)}</div>
                    {t}
                  </div>
                ))}
              </div>
            )}
            {taxonomies_jww_type.length > 0 && (
              <div className="mr-6">
                {taxonomies_jww_type?.map((type) => (
                  <div className="flex items-center pb-2">
                    <div className="mr-3">{getTypeIconByName(type)}</div>
                    {convertAmpersands(type)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="">{dayjs(post_date * 1000).format('MM/DD/YY')}</div>
        </div>
        <h2 className="my-4 text-2xl">{post_title}</h2>
        <div className="mb-6">{post_excerpt} ...</div>
        {/* <a href={resourceLink} className="inline-block py-2 px-8 bg-brand-orange text-center text-white" target="_blank">
          VIEW RESOURCE
        </a> */}
          <button className="inline-block py-2 px-8 bg-brand-orange text-center text-white"
                onClick={() => onCardClick(hit)}
                >
          VIEW RESOURCE   
          </button> 
      </div>
      <div
        className="flex-grow-0 flex-shrink-0 flex flex-column justify-center items-center p-3 bg-brand-gray text-center"
        style={{ flexBasis: '190px', maxWidth: 190, minHeight: 362 }}
      >
        {committees?.map((committee) => (
          <div className="flex flex-col items-center pb-2">
            <div className="mb-4">{getCommitteeIconsByName(committee[1])}</div>
            <div className="mb-4">{committee[1]}</div>
            <Link href={`/committees/${committee[0]}`}>
              <a className="inline-block">
                <Image
                  src="/images/right-arrow.png"
                  width={51}
                  height={26}
                  alt="Right Arrow"
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resource;
