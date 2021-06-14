import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Photos = ({ photos }) => {
  console.log(photos);

  return null;
};

Photos.propTypes = {
  photos: PropTypes.array.isRequired
};

export default Photos;
