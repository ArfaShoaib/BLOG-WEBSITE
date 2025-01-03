'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

const Blogposts = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const router = useRouter(); // Use router here if needed

  const fetchPosts = async () => {
    const query = `*[_type=='Blog_Posts'] | order(_createdAt asc){
      summary, 
      title, 
      "imageUrl": poster.asset->url,
      "slug": slug.current
    }`;

    const fetchedPosts = await client.fetch<Posts[]>(query);
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Blog Posts
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <Link href={`/blog/${post.slug}`}>
                <h1 className="text-blue-500 hover:underline">Read More</h1>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogposts;
