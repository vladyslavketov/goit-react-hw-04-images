import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imglist, onImgItemClick }) => {
  return (
    <ul className="gallery">
      {imglist.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onImgClick={onImgItemClick}
        />))}
    </ul>
  );
};

ImageGallery.propTypes = {
  imglist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;