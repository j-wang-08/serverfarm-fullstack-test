import { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Loading from "./Loading";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await PostService.getAllPosts();
      console.log("res: ", res.data);
      setPosts(res.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="p-10">
      <p className="text-2xl text-center font-bold mb-5">My Posts</p>

      <div>
        {isLoading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : posts.length <= 0 ? (
          <p className="text-center">No posts</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {posts.map((post, idx) => (
              <div key={idx} className="flex justify-center items-center">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
