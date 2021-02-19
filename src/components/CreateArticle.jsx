import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "./Header";

export default class CreateArticle extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      description: "",
      content: "",
      tags: "",
      image: "",
      articlePost: null,
      success: false,
      errors: {
        title: "",
        description: "",
        content: "",
      },
    };
  }
  changeHandler = ({ target }) => {
    let { name, value } = target;
    let error = this.state.errors;
    switch (name) {
      case "title":
        error.title =
          value.length > 1 && value.length < 10
            ? "title must be at least 10 character"
            : "";
        break;
      case "description":
        error.description =
          value.length > 1 && value.length < 25
            ? "description must be at least 25 character"
            : "";
        break;
      case "content":
        error.content =
          value.length > 1 && value.length < 100
            ? "content must be at least 100 character"
            : "";
        break;
      default:
        break;
    }
    this.setState({
      error,
      [name]: value,
    });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    const article = {
      article: {
        title: this.state.title,
        description: this.state.description,
        body: this.state.content,
        img : this.state.image,
        tagList: this.state.tags.split(","),
      },
    };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: user.createdToken,
      };

      await fetch(`/api/articles`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(article),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            articlePost: data,
            success: true,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    let { title, description, content } = this.state.errors;
    if (this.state.success) {
      return (
        <Redirect to={`/article/${this.state.articlePost.articles.slug}`} />
      );
    } else if (!user) {
      return <Redirect to="/register/login" />;
    }
    return (
      <section className="home">
        <div className="home-container flex">
          <div className="header-grid">
            <Header />
          </div>

          <div className="single-article-detail create-article">
            <h2 className="text-center">Create Article</h2>
            <form onSubmit={this.submitHandler}>
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    className={title ? "error input" : "success input"}
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={this.changeHandler}
                    value={this.state.title}
                    required
                  />
                </div>
              </div>
              <span className="text-red">{title}</span>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <input
                    className={description ? "error input" : "success input"}
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={this.changeHandler}
                    value={this.state.description}
                    required
                  />
                </div>
              </div>
              <span className="text-red">{description}</span>

              <div class="field">
                <label class="label">Content</label>
                <div class="control">
                  <textarea
                    className={content ? "error input" : "success input"}
                    name="content"
                    placeholder="Content"
                    value={this.state.content}
                    onChange={this.changeHandler}
                    required></textarea>
                </div>
              </div>

              <span className="text-red">{content}</span>

              <div class="field">
                <label class="label">Image</label>
                <div class="control">
                  <input
                    class="input"
                    name="image"
                    type="text"
                    placeholder="Image url"
                    value={this.state.image}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Tags</label>
                <div class="control">
                  <input
                    class="input"
                    name="tags"
                    type="text"
                    placeholder="Tags"
                    value={this.state.tags}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Post Article</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
