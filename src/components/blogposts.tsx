"use client";  
import { useEffect, useState } from "react";  
import Link from "next/link";  
import { client } from "@/sanity/lib/client";  
import Image from "next/image";  

// Define a type for the content structure  
interface Content {  
  // Replace these properties with the actual structure of your content  
  _key: string;  
  _type: string;  
  text?: string; // Example property for text content  
  // Add other properties as needed  
}  

interface Author {  
  name: string;  
  image: string;  
  bio: string;  
}  

interface Posts {  
  title: string;  
  slug: string;  
  description: string;  
  imageUrl: string;  
  content: Content[]; // Use the specific type here  
  author: Author;  
}  

const BlogPosts = () => {  
  const [posts, setPosts] = useState<Posts[]>([]);  

  const fetchPosts = async () => {  
    const query = `*[_type == "Blog_Posts"] {  
      "title": Post_Posts,  
      "slug": slug.current,  
      description,  
      "imageUrl": image.asset->url,  
      content,  
      "author": author->{  
        name,  
        "image": image.asset->url,  
        bio  
      }  
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
      <div className="max-w-7xl mx-auto">  
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">  
          {posts.map((post) => (  
            <li  
              key={post.slug}  
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"  
            >  
              {post.imageUrl ? (  
                <div className="relative w-full h-48">  
                  <Image  
                    src={post.imageUrl}  
                    alt={post.title}  
                    fill  
                    className="object-cover"  
                  />  
                </div>  
              ) : (  
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">  
                  <span className="text-gray-500">No Image Available</span>  
                </div>  
              )}  
              <div className="p-5">  
                <h2 className="text-xl font-semibold text-gray-800 mb-3">  
                  {post.title}  
                </h2>  
                <p className="text-gray-600 mb-4 line-clamp-3">  
                  {post.description}  
                </p>  
                <Link  
                  href={`/blog/${post.slug}`} // Use template literals correctly  
                  className="text-blue-500 hover:underline inline-block"  
                >  
                  Read More  
                </Link>  
              </div>  
            </li>  
          ))}  
        </ul>  
      </div>  
    </div>  
  );  
};  

export default BlogPosts;