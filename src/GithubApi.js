import React, { Component } from 'react'


function withGithubLogin(WrappedComponent, clientId) {
    return class extends React.Component {
        componentWillMount() {
            const existingToken = sessionStorage.getItem('token')
            const accessToken = (window.location.search.split("=")[0] === "?access_token") ?  window.location.search.split("=")[1] : null;
        
            if (!accessToken && !existingToken) {
              window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
            }
        
            if (accessToken) {
              console.log(`New accessToken: ${accessToken}`);
          
              sessionStorage.setItem("token", accessToken);
              this.setState({
                token: accessToken
              });
            }
        
            if (existingToken) {
              this.setState({
                token: existingToken
              });
            }   
        }
        render() {
            return <WrappedComponent
            token={this.state.token}
            {...this.props} />
          }
    }
}

export function withGithub(WrappedComponent, clientId) {
    const base = class extends React.Component {
        async fetchData() {
            await fetch(`https://api.github.com/user/repos?access_token=${this.state.token}`)
            .then((data) => data.json())
            .then((json) => console.log(json))
          }

        //   componentDidMount() {
        //       this.fetchData()
        //   }
          
          render() {
            return <WrappedComponent get={this.fetchData.bind(this)}      
            {...this.props} />
          }
    }
    return withGithubLogin(base, clientId);
}

