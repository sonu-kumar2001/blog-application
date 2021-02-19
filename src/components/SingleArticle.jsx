import React, { Component } from "react";
import Loader from "./Loader";
import Header from "./Header";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class SingleArticle extends Component {
  constructor(props) {
    super();
    this.state = {
      articleData: null,
      commentPost: "",
      commentData: null,
      deletedArticle: false,
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params;
    let article = axios.get(`/api/articles/${slug}`);
    let comments = axios.get(`/api/articles/${slug}/comments`);

    Promise.all([article, comments]).then((res) => {
      console.log(res);
      this.setState({
        articleData: res[0].data.articles,
        commentData: res[1].data.comment,
      });
    });
  }
  submitHandler = async (event) => {
    event.preventDefault();
    let { slug } = this.props.match.params;
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: user.createdToken,
    };
    const comment = {
      comment: {
        body: this.state.commentPost,
      },
    };
    console.log(comment);
    try {
      await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(comment),
      });
      await fetch(`/api/articles/${slug}/comments`)
        .then((res) => res.json())
        .then((data) => this.setState({ commentData: data.comment }));
      this.setState({
        commentPost: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  changeHandler = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  deleteHandler = (id) => {
    let { slug } = this.props.match.params;
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: user.createdToken,
    };
    fetch(`/api/articles/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    fetch(`/api/articles/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => this.setState({ commentData: data.comment }));
  };
  deleteArticleHandler = () => {
    let { slug } = this.props.match.params;
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: user.createdToken,
    };
    fetch(`/api/articles/${slug}`, {
      method: "DELETE",
      headers: headers,
    }).then(() => this.setState({ deletedArticle: true }));
  };
  render() {
    let { slug } = this.props.match.params;
    const user = JSON.parse(localStorage.getItem("user"));
    let singleArticle = this.state.articleData;
    let userComments = this.state.commentData;
    if (!this.state.articleData || !this.state.commentData) {
      return <Loader />;
    } else if (this.state.deletedArticle) {
      return <Redirect to="/register/login" />;
    }

    return (
      <section className="home">
        <div className="home-container flex">
          <div className="header-grid">
            <Header />
          </div>

          <div className="single-article-detail">
            <h1>{singleArticle.title}</h1>
            <div className="flex author">
              <i class="fas fa-user-circle"></i>
              <h3>{singleArticle.author.username}</h3>
            </div>
            <img src={singleArticle.img} alt="article-img" />
            <p className="article-para">{singleArticle.body}</p>

            <section className="comment-section">
              <div className={user ? "comment-input visible" : "hidden"}>
                <form onSubmit={this.submitHandler} className="flex-between">
                  <input
                    type="text"
                    name="commentPost"
                    value={this.state.commentPost}
                    onChange={this.changeHandler}
                  />
                  <button type="submit">Comment</button>
                </form>
              </div>
              <div className="user-comments">
                {userComments.map((comment) => {
                  return (
                    <div className="comment-box">
                      <h2>{comment.author.username}</h2>
                      <p>{comment.body}</p>
                      <button
                        className={
                          user?.username === comment.author.username
                            ? "visible"
                            : "hidden"
                        }
                        onClick={() => {
                          this.deleteHandler(comment.id);
                        }}>
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="extra-properties">
            <Link
              to={{
                pathname: `/update/article/${slug}`,
                state: this.state.articleData,
              }}>
              <i
                className={
                  user?.username === singleArticle.author.username
                    ? "visible far fa-edit"
                    : "hidden far fa-edit"
                }></i>
            </Link>
            <i
              className={
                user?.username === singleArticle.author.username
                  ? "visible fas fa-trash"
                  : "hidden fas fa-trash"
              }
              onClick={this.deleteArticleHandler}></i>
            <i
              className={
                user?.username === singleArticle.author.username
                  ? "visible far fa-bookmark"
                  : "hidden far fa-bookmark"
              }></i>
          </div>
        </div>
      </section>
    );
  }
}
