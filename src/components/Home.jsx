import React, { Component } from 'react'
import Header from "./Header";
import Loader from './Loader';
import {Link} from "react-router-dom"

export default class Home extends Component {
    constructor(props) {
        super()
        this.state={
            articleData : null,
        }
    }
    componentDidMount() {
            fetch("/api/articles").then((res) => res.json()).then(articleData=> this.setState({articleData : articleData.articles}));
    }
    
    render() {
        if(!this.state.articleData) {
            return <Loader/>
        }
        return (
            <section className="home">
                <div className="home-container flex">
                    <div className="header-grid">
                        <Header/>
                    </div>
                    <div className="global-article">
                        <h2 className="heading">Global Article</h2>
                        <div className="article-list flex">
                        {
                            this.state.articleData.map(article => {
                                return (
                                    <div className="article-card">
                                        <img src={article.img} alt="article-img"></img>
                                        <div className="article-detail">
                                            <Link to={`/article/${article.slug}`}>
                                                <h2>{article.title}</h2>
                                            </Link>
                                            <h3>{article.description}</h3>
                                            <div className="author-div flex">
                                                <i class="far fa-user-circle"></i>
                                                <h4>{article.author.username}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="tag-section">
                        <div className="tags">
                            <h3>Popular Tags</h3>
                            <div className="buttons">
                                <button>React</button>
                                <button>Nodejs</button>
                                <button>Angularjs</button>
                                <button>javascript</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}



