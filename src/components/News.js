import React, { Component } from 'react'
import NewsIteam from './NewsIteam'
import Spinner from './Spinner';

export default class News extends Component {

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHunt`;
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dced55d42763427fb7b79ca5ee622783&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handelPreviousPage = async () => {

        await this.setState({ page: this.state.page - 1 });
        await this.updateNews();

    }

    handelNextPage = async () => {
        // this.setState({page:this.state.page+1},()=>{this.updateNews()})

        await this.setState({ page: this.state.page + 1 });
        await this.updateNews();
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className="text-center">NewsHunt - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsIteam title={element.title ? element.title.slice(0, 71) : ""} description={element.description ? element.description.slice(0, 91) : ""} imageUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handelPreviousPage}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextPage}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}
