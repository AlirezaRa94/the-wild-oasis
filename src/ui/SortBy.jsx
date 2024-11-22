import propTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import Select from "./Select";

SortBy.propTypes = {
  options: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.string,
    })
  ),
};

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || options[0].value;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentSort}
      onChange={handleChange}
      type='white'
    />
  );
}

export default SortBy;
