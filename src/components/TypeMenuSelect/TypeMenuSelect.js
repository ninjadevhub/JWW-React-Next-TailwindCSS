import { memo } from 'react';
import MultiSelect from 'react-multi-select-component';

function TypeMenuSelect({
  data,
  types,
  setMultiFacetFilters,
  setTypes,
  refine,
  currentRefinement,
}) {
  return (
    <div className="">
      <MultiSelect
        className=""
        hasSelectAll={false}
        labelledBy="By Type"
        overrideStrings={{ selectSomeItems: 'By Type' }}
        options={[
          { value: '', label: 'See All Types' },
          ...(data?.types?.nodes?.map((obj) => ({
            value: obj.slug,
            label: obj.name,
          })) || []),
        ]}
        value={types}
        onChange={(selected) => {
          setMultiFacetFilters('taxonomies_jww_type', selected);
          setTypes((prevTypes) => {
            if (
              prevTypes.findIndex((type) => type.value === '') === -1 &&
              selected.findIndex((option) => option.value === '') > -1
            ) {
              return [{ value: '', label: 'See All Types' }];
            }

            return selected.filter((type) => type.value !== '');
          });

          setTimeout(() => refine(currentRefinement));
        }}
      />
    </div>
  );
}

export default memo(TypeMenuSelect);
