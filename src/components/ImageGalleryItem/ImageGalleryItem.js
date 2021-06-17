import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={this.props.showImageHandle}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
