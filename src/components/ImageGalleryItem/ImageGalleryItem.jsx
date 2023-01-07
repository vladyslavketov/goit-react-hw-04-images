import PropTypes from 'prop-types';

// class ImageGalleryItem extends Component {
//   render() {
//     const {id, webformatURL, largeImageURL, onImgClick } = this.props;

//     return (
//       <li className="gallery-item" key={id}>
//         <img src={webformatURL} alt={id} onClick={() => {onImgClick(largeImageURL, id)}}/>
//       </li>
//     )
//   };
// };


const ImageGalleryItem = ({ id, webformatURL, largeImageURL, onImgClick }) => {
  return (
    <li className="gallery-item" key={id}>
      <img src={webformatURL} alt={id} onClick={() => { onImgClick(largeImageURL, id) }} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;