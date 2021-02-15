import React, { Component } from 'react'
import Loader from './Loader';
import Header from "./Header"

export default class SingleArticle extends Component {
    constructor(props) {
        super()
        this.state={
            articleData: null,
        }
    }
    componentDidMount() {
        let {slug} = this.props.match.params;
        fetch(`/api/articles/${slug}`).then(res => res.json()).then(articleData=> this.setState({articleData : articleData.articles}));
    }
    
    render() {
        let singleArticle = this.state.articleData;
        if(!this.state.articleData) {
            return <Loader/>
        }
        return (
            <section className="home">
                <div className="home-container flex">
                    <div className="header-grid">
                        <Header/>
                    </div>
                    <div className="single-article-detail">
                        <h1>{singleArticle.title}</h1>
                        <div className="flex author">
                            <i class="fas fa-user-circle"></i>
                            <h3>{singleArticle.author.username}</h3>
                        </div>
                        <img src={singleArticle.img} alt="article-img"/>
                        <p>{singleArticle.body}</p>
                    </div>
                </div>
            </section>
        )
    }
}
