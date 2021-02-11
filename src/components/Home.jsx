import React, { Component } from 'react'
import Header from "./Header";

export default class Home extends Component {
    componentDidMount() {
            fetch("/api/articles").then((res) => res.json()).then(data=> console.log(data));
    }
    
    render() {
        return (
            <section className="home">
                <div className="grid col-1-4">
                    <Header/>
                </div>
            </section>
            // <div>
            //     <Header/>
            // </div>
        )
    }
}



