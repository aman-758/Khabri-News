import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Khabri News`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2119ec38bafd4e008e5c75f503980cfd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews()
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Khabri News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />} {/*This syntax tell us if loading is true then it will be show spinner*/}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => { //Here I used mapping for iterate the array articles, so that we can fetch all the available news
            return <div className='col-md-4' key={element.url}>
              {console.log('This is the element', element)}
              <NewsItem title={element.title ? element.title.slice(0) : ""} description={element.description ? element.description.slice(0) : ""} imageUrl={element.urlToImage} date={element.publishedAt} IndianDate={element.publishedAt} source={element.source.name} url = {element.url} />
            </div>
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrevClick}> &larr; previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
