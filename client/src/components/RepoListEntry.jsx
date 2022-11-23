import React from 'react';


const RepoListEntry = ({repo}) => {


  return (
    <div>
      <div>
        <span>{repo.repoName} by {repo.owner} </span>
        <p>
          {repo.url}
        </p>
        <p>
          {repo.watchers}
        </p>
      </div>
      <br></br>
    </div>
  )
}

export default RepoListEntry;