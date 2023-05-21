import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps ={
        country:'in',
        pageSize:5,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    constructor(){
        super();
        this.state={
            articles : [],
            loading:false,
            page:1
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b6f0960491a4de1a79ad892a74b68cc&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        this.setState({articles:parsedData.articles,
            totalResult:parsedData.totalResult,
            loading:false
        })

    }

    handlePriviousClick = async ()=>{
    console.log("privious click")
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b6f0960491a4de1a79ad892a74b68cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        page:this.state.page-1,
        articles:parsedData.articles,
        loading:false
    })
    }

    handleNextClick = async ()=>{
    console.log("next click");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b6f0960491a4de1a79ad892a74b68cc&page= ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        page:this.state.page + 1,
        articles:parsedData.articles,
        loading:false
    })
    }
    
    render() {
        console.log("render")
        return (
            <>
                <div className="container">
                    <h2 className="text-center my-4">NewsMonkey - Top Headlines</h2>
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                    { this.state.articles.map((element)=>{
                        // console.log(element);
                   return <div className="col-md-4" key={element.url}>
                    <NewItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
                    })}

                    </div>
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePriviousClick}> &larr; Privious</button>
                    <button disabled={this.state.page>13}  type="button" className="btn btn-dark"  onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

                </div>
            </>
        )
    }
}
