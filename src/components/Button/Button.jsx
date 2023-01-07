import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button type="button" className="loadMoreBtn" onClick={onClick}>Load more</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button; 