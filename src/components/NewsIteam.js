import React, { Component } from 'react'

export default class NewsIteam extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl ? "https://static.toiimg.com/photo/88952871.cms" : imageUrl} className="card-img-top" alt="Not Available" />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ left: "90%", zIndex: '1', fontSize:"13px" }}>
                            {source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
