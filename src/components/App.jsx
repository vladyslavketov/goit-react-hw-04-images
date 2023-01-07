import { Component } from "react";

import pixabayAPI from '../services/pixabay-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    searchResult: [],
    totalHits: null,
    page: 1,
    totalPage: null,
    largeImageURL: null,
    id: null,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page, searchResult } = this.state;
    
    if (
      prevState.page !== page ||
      prevState.searchQuery !== searchQuery
    ) {
      this.setState({ status: 'pending' });

      pixabayAPI(searchQuery, page)
        .then(res => {
          const { hits, totalHits } = res;
          const totalPage = Math.ceil(totalHits / PER_PAGE);
  
          this.setState({
            // searchResult: searchResult.concat(hits),
            searchResult: [...searchResult, ...hits],
            totalHits,
            totalPage,
          });
        
        })
        .catch(error => console.log(error))
        .finally(onFinal => {
          this.setState({
          status: 'resolve',
        })})
    }
  }

  onSearchbarSubmit = searchQuery => {
    this.setState({
      searchQuery,
      searchResult: [],
      totalHits: null,
      page: 1,
      totalPage: null,
    });
  };

  onImgItemClick = (largeImageURL, id) => {
    this.setState({ largeImageURL, id });
  };

  onModalClose = e => {
    this.setState({ largeImageURL: null, id: null });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  };

  render() {
    const { searchResult, page, totalPage, largeImageURL, id, status } = this.state;
    const isBtnSjow = searchResult.length > 0 && page !== totalPage;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onSearchbarSubmit} />
        {searchResult.length > 0 && <ImageGallery imglist={searchResult} onImgItemClick={this.onImgItemClick} />}
        {isBtnSjow && <Button onClick={this.loadMore}/>}
        
        {largeImageURL && <Modal largeImageURL={largeImageURL} id={id} onModalClose={this.onModalClose} />}
        {status === 'pending' && <Loader />}
      </div>
    );
  };
};