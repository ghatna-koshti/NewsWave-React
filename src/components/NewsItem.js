import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: 0 }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>

                </div>

                <img src={!imageUrl ? "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202308/flash-message-170856-16x9.jpg?VersionId=phEfX98LcTlbxrnZadOBzBYAvmMi7WRl" : imageUrl} className="card-img-top" alt="..." style={{ height: "161px" }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author}.. on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem