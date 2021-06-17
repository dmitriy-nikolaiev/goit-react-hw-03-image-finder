import { Component } from 'react';
import './styles.css';

import fetchImages from './services/apiService';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal/';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    openModal: false,
    // fullImageURL:'',
  };

  maxPages = 0;
  fullImageURL = '';

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.searchImagesHandler();
    }
  }

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  showImageHandler = (imageUrl) => () => {
    console.log(imageUrl, 'imageUrl to modal');
    this.fullImageURL = imageUrl;
    this.toggleModal();
    // this.setState(({ fullImageURL }) => ({
    //   fullImageURL: imageUrl,
    // }));
  };

  searchImagesHandler = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const result = await fetchImages(searchQuery, page);

      // console.log(result, 'result');
      if (result.total !== 0) {
        this.maxPages = Math.ceil(result.totalHits / 12);

        this.setState(({ images }) => ({
          images: [...images, ...result.hits],
        }));
      } else {
        console.log('Not found');
      }
      // console.log(result, 'result');
      // console.log(this.state, 'this.state');
    } catch (error) {
      console.log(error, 'error');
    }

    this.setState({ isLoading: false });
  };

  loadMoreHandler = () => {
    this.setState(() => ({ page: Math.min(this.maxPages, this.state.page + 1) }));
  };

  onSubmitHandler = (searchString) => {
    this.maxPages = 0;

    this.setState(() => ({
      images: [],
      searchQuery: searchString,
      page: 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitHandler} />
        <ImageGallery images={this.state.images} showImageHandler={this.showImageHandler} />
        {this.state.isLoading && <Loader />}
        {this.state.page < this.maxPages && <Button loadMoreHandler={this.loadMoreHandler} />}
        {this.state.openModal && (
          <Modal fullImageURL={this.fullImageURL} onClose={this.toggleModal}></Modal>
        )}
      </div>
    );
  }
}

export default App;
