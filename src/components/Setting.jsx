import React, { Component } from "react";
import Header from "./Header";
export default class Setting extends Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      bio: "",
      image: "",
    };
  }
  // componentDidMount() {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   fetch(`/api/profiles/${user.username}`)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       this.setState({
  //         username: data.profiles.username,
  //         bio: data.profiles.bio,
  //         image: data.profiles.image,
  //       })
  //     );
  // }

  changeHandler = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  submitHandler = async (event) => {
    event.preventDefault();
    const userUpdate = {
      "user": {
        "username": this.state.username,
        "bio": this.state.bio,
        "image": this.state.image,
      },
    };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: user.createdToken,
      };
      await fetch(`/api/user`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(userUpdate),
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <section className="home">
        <div className="home-container flex">
          <div className="header-grid">
            <Header />
          </div>

          <div className="single-article-detail create-article">
            <h2 className="text-center">Update User</h2>
            <form onSubmit={this.submitHandler} className="user-update-form">
              <div class="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    type="text"
                    onChange={this.changeHandler}
                    value={this.state.username}
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="field">
                <label className="label">Image</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Image Url"
                    name="image"
                    onChange={this.changeHandler}
                    value={this.state.image}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bio</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.changeHandler}></textarea>
                </div>
              </div>
              <div class="control">
                <button className="button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
