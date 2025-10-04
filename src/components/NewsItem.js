import React from 'react'

const NewsItem = (props) => {
  let {title, description,imageUrl,newsUrl,author,date} = props;
  return (
    <div className='my-3'>
      <div className="card">
        <img src={!imageUrl?"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F69a698a1-7ab8-49f1-97cc-5a85797a3830.jpg?source=next-article&amp;fit=scale-down&amp;quality=highest&amp;width=700&amp;dpr=1":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
