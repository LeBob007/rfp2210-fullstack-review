import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'

const RepoList = ({ repos }) => {

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      {repos.map((repo, index) => {
        return (<RepoListEntry repo={repo} key={index}/>)
      })}
    </div>
  )
}

export default RepoList;
