import React, { Component } from 'react'

export default class NewItem extends Component {
  render() {
    let {title, description,imageUrl,newsUrl} = this.props;
    return (
      <div>
      <div className="card my-2" style={{minHeight:"500px"}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title text-center">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl}  rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
</div>
    )
  }
}
