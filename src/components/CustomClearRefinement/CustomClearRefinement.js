import { memo } from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

function ClearRefinements({
  items,
  refine,
  hasNoFilter,
  clearAll,
}) {
  return (
    <div className={`ais-ClearRefinements${hasNoFilter ? ' hidden' : ''}`}>
      <button
        className="ais-ClearRefinements-button"
        onClick={() => clearAll()}
      >
        CLEAR SEARCH
      </button>
    </div>
  );
}

export default memo(connectCurrentRefinements(ClearRefinements));
