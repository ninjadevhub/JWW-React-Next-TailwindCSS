import { memo } from 'react';
import MultiSelect from 'react-multi-select-component';

const years = [];
const thisYear = new Date().getFullYear();
for (let year = thisYear; year >= 2015; year--) {
  years.push(year);
}

const yearOptions = [
  { value: '', label: 'See All Years' },
  ...years.map((year) => ({
    value: year,
    label: year,
  })),
];

function YearMenuSelect({
  selectedYears,
  setMultiFacetFilters,
  setSelectedYears,
  refine,
  currentRefinement,
}) {
  return (
    <div className="">
      <MultiSelect
        className=""
        hasSelectAll={false}
        labelledBy="By Year"
        overrideStrings={{ selectSomeItems: 'By Year' }}
        options={yearOptions}
        value={selectedYears}
        onChange={(selected) => {
          setMultiFacetFilters('post_year', selected);
          setSelectedYears((prevYears) => {
            if (
              prevYears.findIndex((year) => year.value === '') === -1 &&
              selected.findIndex((option) => option.value === '') > -1
            ) {
              return [{ value: '', label: 'See All Years' }];
            }

            return selected.filter((year) => year.value !== '');
          });

          setTimeout(() => refine(currentRefinement));
        }}
      />
    </div>
  );
}

export default memo(YearMenuSelect);
