import { memo } from 'react';
import MultiSelect from 'react-multi-select-component';

function CommitteeMenuSelect({
  data,
  committees,
  setMultiFacetFilters,
  setCommittees,
  refine,
  currentRefinement,
}) {
  return (
    <div className="">
      <MultiSelect
        className=""
        hasSelectAll={false}
        labelledBy="By Committee"
        overrideStrings={{ selectSomeItems: 'By Committee' }}
        options={[
          { value: '', label: 'See All Committees' },
          ...(data?.committees?.nodes?.map((obj) => ({
            value: obj.slug,
            label: obj.name,
          })) || []),
        ]}
        value={committees}
        onChange={(selected) => {
          setMultiFacetFilters('taxonomies_committee', selected);
          setCommittees((prevCommittees) => {
            if (
              prevCommittees.findIndex(
                (committee) => committee.value === ''
              ) === -1 &&
              selected.findIndex((option) => option.value === '') > -1
            ) {
              return [{ value: '', label: 'See All Committees' }];
            }

            return selected.filter((committee) => committee.value !== '');
          });

          setTimeout(() => refine(currentRefinement));
        }}
      />
    </div>
  );
}

export default memo(CommitteeMenuSelect);
