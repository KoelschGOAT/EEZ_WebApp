import React from 'react'
import BarLoader from "react-spinners/BarLoader";
import PropTypes from "prop-types";

function Loader({loading}) {
  return (
    <div className="loading">
          <BarLoader loading={loading} color={"#00665a"} size={150} />
    </div>
  )
}
Loader.propTypes = {
	loading: PropTypes.bool.isRequired
};
export default Loader