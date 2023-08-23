import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false);

        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsWave `;

        updateNews();
    }, [])



    // handlePreviousClick = async () => {
    //     this.setState({ page: page - 1 });
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: page + 1 });
    //     this.updateNews();
    // }

    const fetchMoreData = async () => {


        // this.setState({ page: page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);




    };

    return (
        <>
            <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
                NewsWave - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}



            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">



                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : "click on the read more to see full infornmation about this News if you find it intersting"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author.slice(0, 10) : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>  &larr; Previous</button>
                    <button type="button" disabled={page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
                </div> */}
        </>
    )

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    totalResults: 0,
}

export default News