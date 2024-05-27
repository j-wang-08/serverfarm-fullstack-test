const PostCard = ({ post }) => {
  return (
    <div className="w-full max-w-sm h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 text-ellipsis whitespace-nowrap overflow-hidden">
          {post.content}
        </p>
      </div>
      <div className="w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer">
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default PostCard;
