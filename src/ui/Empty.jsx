import propTypes from "prop-types";

Empty.propTypes = {
  resourceName: propTypes.string.isRequired,
};

function Empty({ resourceName }) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
