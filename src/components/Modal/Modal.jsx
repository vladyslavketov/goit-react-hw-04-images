import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleBackdropClick = e => {
    this.props.onModalClose();
  };

  render() {
    const { largeImageURL, id } = this.props;

    return createPortal (
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={largeImageURL} alt={id} />
        </div>
      </div>,
      modalRoot,
    )
  };
};

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;