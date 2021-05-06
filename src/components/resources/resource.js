import dayjs from 'dayjs';

const Resource = ({ hit }) => {
  const {
    post_date,
    images,
    taxonomies,
    post_title,
    content,
  } = hit;

  return (
    <div className="rounded text-gray-700">
      <div className="py-4 pl-4 bg-gray-100">
        <div className="pb-4 flex justify-between items-center">
          <div className="ml-8 text-xs">{dayjs(post_date * 1000).format('MM/DD/YY')}</div>
          {Date.now() - post_date * 1000 < 61 * 24 * 60 * 60 * 1000 && (
            <div className="py-2 px-3 bg-blue-500 text-xs text-white">New</div>
          )}
        </div>
        {images.length > 0 ?
        images.map((image) => JSON.stringify(image)) :
        <div className="ml-8 bg-gray-200" style={{ width: 'calc(100% - 5rem)', height: 300 }}></div>}
        <div className="pt-3 text-center text-xs">
          {taxonomies?.committee?.map(committee => (
            <div>{committee}</div>
          ))}
        </div>
      </div>
      <div className="pt-6 pb-4 px-8 bg-white">
        <div className="flex text-center text-xs">
          {taxonomies?.topic &&
          <div className="flex flex-col justify-center items-center py-2 px-3 mr-3 bg-gray-100">
            {taxonomies?.topic?.map(t => (
              <div>{t}</div>
            ))}
          </div>}
          {taxonomies?.jww_type &&
          <div className="flex flex-col justify-center items-center py-2 px-3 bg-gray-500 text-white">
            {taxonomies?.jww_type?.map(type => (
              <div>{type}</div>
            ))}
          </div>}
        </div>
        <h3 className="my-4 text-2xl">{post_title}</h3>
        <div>{content?.slice(0, 100)}...</div>
      </div>
    </div>
  );
};

export default Resource;
