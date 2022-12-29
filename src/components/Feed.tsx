import React, { useEffect, useState, useRef } from "react";
import FeedPosts from "./FeedPosts";
interface Feed {
  posts: { content: string }[];
}
// feed should have child feedpost
// feedpost should have child feedcomment
const Feed = () => {
  const [posts, setPosts] = useState<
    { content: string; post_id: number; time_created: string; likes: number }[]
  >([]);
  // postsFetched to prevent constant rerender
  const [postsFetched, setPostsFetched] = useState(true);
  const [dogImage, setDogImage] = useState("");
  const [comment, setComment] = useState([]); // should be moved to child component of each post
  const commentRef = useRef<HTMLInputElement | string>(""); // gave up on this because it doesn't rerender!! only stores ref to values/nodes

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = fetch("/api/post", {
      signal: controller.signal,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        // prevent constant rerender
        if (postsFetched) {
          fetchImages();
          setPosts(posts.concat(data.posts));
        }
        setPostsFetched(false);
      })
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, []); // if we want to refetch, we would need to have a state that tracks when a new post has been made. since the homeview (homelayout basically) is using mui components, we don't have a overarching state. we could either implement redux( no thanks) or change the boxes into actual react components

  const fetchImages = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((data) => data.json())
      .then((data) => {
        setDogImage(data.message);
        return;
      });
  };

  const listPosts = [...posts].reverse().map((post, i) => {
    return (
      // Container inside feed
      <div
        key={post.post_id}
        style={{ border: "1px black solid", margin: 10, padding: 10 }}
      >
      {/* Random profile pic of dog */}
        <img
          src={dogImage}
          alt="User Profile Picture"
          width={50}
          height={50}
        ></img>
        <p>{post.content}</p>
        <p>{post.time_created.slice(0, 19)}</p>
        <button>heart{post.likes}</button>
        <br></br>
        {/* Fake comment section */}
        {/* I can see why reusable components are so helpful LOL */}
        {/* This renders comments in every div because it's inside the map. Best to create different components to target specific nodes 
        Also something to consider is that we want to persist comments and posts, so we would store those in DB anyway
        */}
        <div style={{border:'2px black solid', padding:10, margin:10}}>
          Comment section{" "}
          {comment.map((el, i) => {
            return (
              <div
                key={`${el}${i}`}
                style={{ border: "black 1px solid", margin: 5, padding: 5 }}
              >
                {el}
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.value);
            return setComment(comment.concat(e.target.comment.value));
          }}
        >
          <input name="comment" placeholder="Make a comment"></input>
          <button type="submit">Post Comment</button>
        </form>
      </div>
    );
  });
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
  );
};

export default Feed;
