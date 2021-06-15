import Autocomplete from '../Autocomplete/Autocomplete';
import CommitteeMenuSelect from '../CommitteeMenuSelect/CommitteeMenuSelect';
import TopicMenuSelect from '../TopicMenuSelect/TopicMenuSelect';
import TypeMenuSelect from '../TypeMenuSelect/TypeMenuSelect';
import YearMenuSelect from '../YearMenuSelect/YearMenuSelect';
import CustomClearRefinements from '../CustomClearRefinement/CustomClearRefinement';
import Button from '../Button/Button';
import Link from 'next/link';
import { connectSearchBox, Stats } from 'react-instantsearch-dom';

function CustomWidgets({
  setDropTokensThreshold,
  setNumTypos,
  setSearchMode,
  refine,
  currentRefinement,
  setFacetFilters,
  setCommittees,
  setTopics,
  setTypes,
  setSelectedYears,
  textInputRef,
  allRadioRef,
  searchMode,
  anyRadioRef,
  exactRadioRef,
  data,
  committees,
  setMultiFacetFilters,
  topics,
  types,
  selectedYears,
}) {
  const handleSearchModeChange = (event) => {
    const newSearchMode = event.currentTarget.value;
    switch (newSearchMode) {
      case 'All':
        setDropTokensThreshold(0);
        setNumTypos(2);
        break;
      case 'Any':
        setDropTokensThreshold(100);
        setNumTypos(2);
        break;
      case 'Exact':
        setDropTokensThreshold(0);
        setNumTypos(1);
        break;
      default:
        break;
    }

    setSearchMode(newSearchMode);
    setTimeout(() => refine(currentRefinement));
  };

  const clearAll = () => {
    setFacetFilters([]);
    setSearchMode('All');
    setCommittees([]);
    setTopics([]);
    setTypes([]);
    setSelectedYears([]);
    setTimeout(() => refine(''));
  };

  const hasNoFilter =
    !currentRefinement &&
    (committees.length === 0 || committees[0].value === '') &&
    (topics.length === 0 || topics[0].value === '') &&
    (types.length === 0 || types[0].value === '') &&
    (selectedYears.length === 0 || selectedYears[0].value === '');

  return (
    <>
      <div className="py-14 px-24 border-b-thick-brand-green bg-brand-gray">
        <div className="bg-brand-gray-pale">
          <div className="flex border-solid border-b border-brand-gray">
            <div className="w-2/5 pt-6 pr-6 pl-6">
              <h2 className="mb-6 text-center text-2xl">
                What are you looking for?
              </h2>
              <div className="pb-4">
                <Autocomplete
                  searchCurrentRefinement={currentRefinement}
                  searchRefine={refine}
                  textInputRef={textInputRef}
                />
              </div>
              <div className="flex flex-wrap pb-3">
                <label className="flex mr-3 justify-center items-center">
                  <input
                    type="radio"
                    className=""
                    ref={allRadioRef}
                    name="searchMode"
                    value="All"
                    checked={!searchMode || searchMode === 'All'}
                    onChange={handleSearchModeChange}
                  />
                  <span className="pl-1">All words</span>
                </label>
                <label className="flex mr-3 items-center">
                  <input
                    type="radio"
                    className=""
                    ref={anyRadioRef}
                    name="searchMode"
                    value="Any"
                    checked={searchMode === 'Any'}
                    onChange={handleSearchModeChange}
                  />
                  <span className="pl-1">Any words</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className=""
                    ref={exactRadioRef}
                    name="searchMode"
                    value="Exact"
                    checked={searchMode === 'Exact'}
                    onChange={handleSearchModeChange}
                  />
                  <span className="pl-1">Exact words</span>
                </label>
              </div>
            </div>
            <div className="w-3/5 pt-6 border-solid border-l border-brand-gray">
              <div className="flex flex-wrap pb-6 px-4 border-solid border-b border-brand-gray">
                <div className="w-1/4 px-2">
                  <CommitteeMenuSelect
                    data={data}
                    committees={committees}
                    setMultiFacetFilters={setMultiFacetFilters}
                    setCommittees={setCommittees}
                    refine={refine}
                    currentRefinement={currentRefinement}
                  />
                </div>
                <div className="w-1/4 px-2">
                  <TopicMenuSelect
                    data={data}
                    topics={topics}
                    setMultiFacetFilters={setMultiFacetFilters}
                    setTopics={setTopics}
                    refine={refine}
                    currentRefinement={currentRefinement}
                  />
                </div>
                <div className="w-1/4 px-2">
                  <TypeMenuSelect
                    data={data}
                    types={types}
                    setMultiFacetFilters={setMultiFacetFilters}
                    setTypes={setTypes}
                    refine={refine}
                    currentRefinement={currentRefinement}
                  />
                </div>
                <div className="w-1/4 px-2">
                  <YearMenuSelect
                    selectedYears={selectedYears}
                    setMultiFacetFilters={setMultiFacetFilters}
                    setSelectedYears={setSelectedYears}
                    refine={refine}
                    currentRefinement={currentRefinement}
                  />
                </div>
              </div>
              <div className="flex py-6 px-4 text-white">
                <div className="flex-grow px-2">
                  <Link href="#">
                    <a className="block py-2 px-3 bg-brand-blue text-center">
                      FOR MEMBERS
                    </a>
                  </Link>
                </div>
                <div className="flex-grow px-2">
                  <Link href="#">
                    <a className="block py-2 px-3 bg-brand-blue text-center">
                      JERSEY WATERCHECK
                    </a>
                  </Link>
                </div>
                <div className="flex-grow px-2">
                  <Link href="#">
                    <a className="block py-2 px-3 bg-brand-blue text-center">
                      EQUITY MAP
                    </a>
                  </Link>
                </div>
                <div className="flex-grow px-2">
                  <Link href="/videos/">
                    <a className="block py-2 px-3 bg-brand-blue text-center">
                      VIDEOS
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {(currentRefinement ||
            (committees.length > 0 && committees[0]?.value) ||
            (topics.length > 0 && topics[0]?.value) ||
            (types.length > 0 && types[0]?.value) ||
            (selectedYears.length > 0 && selectedYears[0]?.value)) && (
            <div className="pb-6 pl-6 pr-6">
              <div className="flex justify-end pt-2 text-brand-green">
                <CustomClearRefinements
                  clearsQuery
                  translations={{
                    reset: 'CLEAR SEARCH',
                  }}
                  hasNoFilter={hasNoFilter}
                  clearAll={clearAll}
                />
              </div>
              <div className="flex flex-wrap items-center">
                {currentRefinement && (
                  <div className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray">
                    <Link href="#">
                      <a className="block p-2 mr-3">{currentRefinement}</a>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                      type="button"
                      onClick={() => refine('')}
                    >
                      &times;
                    </button>
                  </div>
                )}
                {committees.length > 0 &&
                  committees[0]?.value &&
                  committees.map((committee) => (
                    <div
                      className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                      key={committee.value}
                    >
                      <Link href="#">
                        <a className="block p-2 mr-3">{committee.label}</a>
                      </Link>
                      <button
                        className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                        type="button"
                        onClick={() => {
                          const newCommittees = committees.filter(
                            (item) => item.value !== committee.value
                          );
                          setMultiFacetFilters(
                            'taxonomies_committee',
                            newCommittees
                          );
                          setCommittees(newCommittees);
                          setTimeout(() => refine(currentRefinement));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                {topics.length > 0 &&
                  topics[0].value !== '' &&
                  topics.map((topic) => (
                    <div
                      className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                      key={topic.value}
                    >
                      <Link href="#">
                        <a className="block p-2 mr-3">{topic.label}</a>
                      </Link>
                      <button
                        className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                        type="button"
                        onClick={() => {
                          const newTopics = topics.filter(
                            (item) => item.value !== topic.value
                          );
                          setMultiFacetFilters('taxonomies_topic', newTopics);
                          setTopics(newTopics);
                          setTimeout(() => refine(currentRefinement));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                {types.length > 0 &&
                  types[0].value !== '' &&
                  types.map((type) => (
                    <div
                      className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                      key={type.value}
                    >
                      <Link href="#">
                        <a className="block p-2 mr-3">{type.label}</a>
                      </Link>
                      <button
                        className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                        type="button"
                        onClick={() => {
                          const newTypes = types.filter(
                            (item) => item.value !== type.value
                          );
                          setMultiFacetFilters('taxonomies_jww_type', newTypes);
                          setTypes(newTypes);
                          setTimeout(() => refine(currentRefinement));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                {selectedYears.length > 0 &&
                  selectedYears[0].value !== '' &&
                  selectedYears.map((selectedYear) => (
                    <div
                      className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                      key={selectedYear.label}
                    >
                      <Link href="#">
                        <a className="block p-2 mr-3">{selectedYear.label}</a>
                      </Link>
                      <button
                        className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                        type="button"
                        onClick={() => {
                          const newSelectedYears = selectedYears.filter(
                            (item) => item.label !== selectedYear.label
                          );
                          setMultiFacetFilters('post_year', newSelectedYears);
                          setSelectedYears(newSelectedYears);
                          setTimeout(() => refine(currentRefinement));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {topics.length > 0 && topics[0].value && (
        <div className="flex w-full mt-8">
          <div className="w-52 min-h-33 flex justify-center items-center px-8 py-4 text-center bg-brand-green text-white text-2xl">
            Topic Overviews
          </div>
          <div className="flex items-center flex-grow p-8 bg-brand-gray">
            {topics.map((topic) => (
              <Button
                key={topic.value}
                className="mr-4"
                uri={`/topics/${topic.value}`}
              >
                {topic.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      {committees.length > 0 && committees[0].value && (
        <div className="flex w-full mt-4">
          <div className="w-52 min-h-33 flex justify-center items-center px-8 py-4 text-center bg-brand-green text-white text-2xl">
            Topic Overviews
          </div>
          <div className="flex items-center flex-grow p-8 bg-brand-gray">
            {committees.map((committee) => (
              <Button
                key={committee.value}
                className="mr-4"
                uri={`/committees/${committee.value}`}
              >
                {committee.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="py-8">
        <Stats
          translations={{
            stats(nbHits) {
              return (
                (currentRefinement?.split(/\s+/).length === 1 ||
                  searchMode !== 'Exact') &&
                `${nbHits.toLocaleString()} Results Found`
              );
            },
          }}
        />
      </div>
    </>
  );
}

export default connectSearchBox(CustomWidgets);
