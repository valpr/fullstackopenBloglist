import React from 'react'
import { useParams } from 'react-router-dom'

const DetailedUserView = ({userList}) => {
    let { id } = useParams()

    const selected = userList.find(user => user.id === id)

    if (!selected) {
      return null
    }
    console.log('hi')
    return ( //get params or useRouteMatch
      <div>
        <h2>{selected.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {selected.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    )
  }

export default DetailedUserView