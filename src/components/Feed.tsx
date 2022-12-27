import React, { useEffect, useState } from 'react'
import FeedPosts from './FeedPosts'
interface Feed {
  posts: {content:string}[]
}

const Feed = () => {
  const [posts, setPosts] = useState<{content:string}[]>([])
  const [postsFetched, setPostsFetched] = useState(true)
  const [dogImage, setDogImage] = useState('')

  useEffect(() => {
   const fetchPosts = fetch('/api/post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(data=>data.json())
    .then(data=>{
      // prevent constant rerender
      if (postsFetched) {
        fetchImages()
        setPosts(posts.concat(data.posts))
      }
      setPostsFetched(false)
    })
    .catch(err=>console.log(err));
  },[])
  
  const fetchImages = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(data=>data.json())
    .then(data=>{
      setDogImage(data.message)
      return;
    })
  }


  const listPosts = posts.map((post, i) => {
    return (
      <div key={post.post_id} style={{border:'1px black solid', margin:10, padding:10}}>
        <img src={dogImage} alt='User Profile Picture' width={50} height={50}></img>
        <p>
        {post.content}
        </p>
        <p>
        {(post.time_created).slice(0,19)}
        </p>
        <button>heart{post.likes}</button>
        <br></br>
        <input placeholder='Make a comment'>
          
        </input>
        <button type='submit'>Post Comment</button>
      </div>
    )
  })
/*
  return(
    <div>
    {post.map((post,i)=> {
      <FeedPosts
      key = {post.post_id}
      post ={post}
      />
    })}
    <div/>
  )
*/

  return (
    <div id="feed">
      {listPosts}

      {/* 
        // typescript doesn't like mapping through array of obj
      {
        posts.map((post,i) => {
          <FeedPosts
          />
        })
      }
      
      */}
    
    </div>
  )
}

export default Feed