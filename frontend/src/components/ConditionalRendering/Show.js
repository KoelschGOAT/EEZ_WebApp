import PropTypes from 'prop-types';
//This component checks whether the condition is true to render the children, that are passed down the component
function Show({ condition = false, children }) {
  if (condition) return children;
}
Show.propTypes = {
  condition: PropTypes.any.isRequired,
};
export default Show;
