import { memo } from 'react';
import MultiSelect from 'react-multi-select-component';

function TopicMenuSelect({
  data,
  topics,
  setMultiFacetFilters,
  setTopics,
  refine,
  currentRefinement,
}) {
  return (
    <div className="">
      <MultiSelect
        className=""
        hasSelectAll={false}
        labelledBy="By Topic"
        overrideStrings={{ selectSomeItems: 'By Topic' }}
        options={[
          { value: '', label: 'See All Topics' },
          ...(data?.topics?.nodes?.map((obj) => ({
            value: obj.slug,
            label: obj.name,
          })) || []),
        ]}
        value={topics}
        onChange={(selected) => {
          setMultiFacetFilters('taxonomies_topic', selected);
          setTopics((prevTopics) => {
            if (
              prevTopics.findIndex((topic) => topic.value === '') === -1 &&
              selected.findIndex((option) => option.value === '') > -1
            ) {
              return [{ value: '', label: 'See All topics' }];
            }

            return selected.filter((topic) => topic.value !== '');
          });

          setTimeout(() => refine(currentRefinement));
        }}
      />
    </div>
  );
}

export default memo(TopicMenuSelect);
