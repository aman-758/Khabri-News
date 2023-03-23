import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, date, IndianDate, source, url} = this.props;
    return (
      <div className='container my-3'>
        <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-info"style={{left:'90%',zIndex:'1'}}> {source}
        </span>
        <img src={!imageUrl?"https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.webp":imageUrl} className="card-img-top" alt={imageUrl}/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className='card-text'><small className='text-muted'>{new Date(date).toLocaleTimeString()} {new Date(IndianDate).toLocaleDateString()}</small></p>
        <a href={url} className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
