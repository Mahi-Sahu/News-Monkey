import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title=`${props.category.charAt(0).toUpperCase()+props.category.slice(1)} - NewsMonkey`;

  const updateNews= async () =>{
    props.setProgress(10);
    //console.log("cdm");
    //API call using fetch
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data= await fetch(url);
    props.setProgress(30);
    let paresedData= await data.json();
    props.setProgress(70);
    //console.log(paresedData);
    //set the articles to the state, loading to false and total results to the state
    setArticles(paresedData.articles);
    setTotalResults(paresedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

  // const handlePrevClick= async ()=>{
  //   setPage(page - 1);
  //   updateNews();
  // }
  // const handleNextClick= async ()=>{
  //   setPage(page + 1);
  //   updateNews();
  // }

  const fetchMoreData = async() => {
      //console.log(page);
      //API call using fetch
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a55a1c4f368c4e9f925900fa36ed9373&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      setLoading(true);
      let data= await fetch(url);
      let paresedData= await data.json();
      setArticles(articles.concat(paresedData.articles));
      setTotalResults(paresedData.totalResults);
      setLoading(false);
  };
    
  return (
    <div className='container my-3'>
      <h2 className='text-center'>NewsMonkey - Top {props.category} headlines</h2>
      {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length<totalResults}
        loader={<Spinner/>}
      >

        <div className='container'>
          <div className="row">
            {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <button disabled={Math.ceil(totalResults/props.pageSize)<page + 1} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}
    </div>
  )
}

News.defaultProps={
  country:'us',
  pageSize:9,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News;
