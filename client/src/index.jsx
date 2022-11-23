import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [render, setRender] = useState(false);

  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos', {
        username: term
      })
      .then((res) => {
        console.log('successful search')
        setRender(!render)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios.get('/repos')
      .then((res) => {
        console.log('successful get')
        setRepos(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [render])

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
