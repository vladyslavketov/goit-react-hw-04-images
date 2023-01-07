import { useState, useEffect } from "react";

import pixabayAPI from '../services/pixabay-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const PER_PAGE = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState('idle');

  const isBtnSjow = searchResult.length > 0 && page !== totalPage;

  useEffect(() => {
    if (!searchQuery) {
      return;
    };

    setStatus('pending');
    pixabayAPI(searchQuery, page)
      .then(res => {
        console.log(res);
        const { hits, totalHits } = res;
        const totalPage = Math.ceil(totalHits / PER_PAGE);
        
        setSearchResult(prevState => [...prevState, ...hits]);
        setTotalPage(totalPage);

        if (totalHits > 0) {
          setStatus('resolve');
        } else if (!totalHits) {
          setStatus('reject');
        }
      })
      .catch(error => console.log(error))
      .finally(setStatus('resolve'));
  }, [page, searchQuery]);

  function onSearchbarSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setPage(1);
    setSearchResult([]);
    setTotalPage(null);
  };

  function onImgItemClick (largeImageURL, id) {
    setLargeImageURL(largeImageURL);
    setId(id);
  };

  function onModalClose() {
    setLargeImageURL(null);
    setId(null);
  };

  function loadMore () {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSearchbarSubmit} />
      {searchResult.length > 0 && <ImageGallery imglist={searchResult} onImgItemClick={onImgItemClick} />}
      {isBtnSjow && <Button onClick={loadMore}/>}
      
      {largeImageURL && <Modal largeImageURL={largeImageURL} id={id} onModalClose={onModalClose} />}
      {status === 'pending' && <Loader />}
      {status === 'reject' && <p className="rejectText">No result for the request: "<span>{searchQuery}</span>"</p>}
    </div>
  );
};

// ========================================
// до рефакторингу
// ========================================

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     searchResult: [],
//     totalHits: null,
//     page: 1,
//     totalPage: null,
//     largeImageURL: null,
//     id: null,
//     status: 'idle',
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page, searchResult } = this.state;
    
//     if (
//       prevState.page !== page ||
//       prevState.searchQuery !== searchQuery
//     ) {
//       this.setState({ status: 'pending' });

//       pixabayAPI(searchQuery, page)
//         .then(res => {
//           const { hits, totalHits } = res;
//           const totalPage = Math.ceil(totalHits / PER_PAGE);
  
//           this.setState({
//             // searchResult: searchResult.concat(hits),
//             searchResult: [...searchResult, ...hits],
//             totalHits,
//             totalPage,
//           });
        
//         })
//         .catch(error => console.log(error))
//         .finally(onFinal => {
//           this.setState({
//           status: 'resolve',
//         })})
//     }
//   }

//   onSearchbarSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       searchResult: [],
//       totalHits: null,
//       page: 1,
//       totalPage: null,
//     });
//   };

//   onImgItemClick = (largeImageURL, id) => {
//     this.setState({ largeImageURL, id });
//   };

//   onModalClose = e => {
//     this.setState({ largeImageURL: null, id: null });
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }))
//   };

//   render() {
//     const { searchResult, page, totalPage, largeImageURL, id, status } = this.state;
//     const isBtnSjow = searchResult.length > 0 && page !== totalPage;

//     return (
//       <div className="app">
//         <Searchbar onSubmit={this.onSearchbarSubmit} />
//         {searchResult.length > 0 && <ImageGallery imglist={searchResult} onImgItemClick={this.onImgItemClick} />}
//         {isBtnSjow && <Button onClick={this.loadMore}/>}
        
//         {largeImageURL && <Modal largeImageURL={largeImageURL} id={id} onModalClose={this.onModalClose} />}
//         {status === 'pending' && <Loader />}
//       </div>
//     );
//   };
// };