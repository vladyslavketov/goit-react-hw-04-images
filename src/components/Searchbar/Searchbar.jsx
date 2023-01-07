import { Component } from "react";
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchQuery: null,
  };

  handleChange = e => {
    const searchQuery = e.currentTarget.value.toLowerCase();

    this.setState({ searchQuery });
  }

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: null });
  };
 
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}  
          />
        </form>
      </header>
    )
  };
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;