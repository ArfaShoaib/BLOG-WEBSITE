"use client";

import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Image from "next/image";

interface BlogPost {
  title: string;
  content: TypedObject | TypedObject[];
  imageUrl: string;
  author: {
    name: string;
    bio: string;
  };
  publishedAt: string;
}

const BlogPostPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const query = `*[_type == "Blog_Posts" && slug.current == $slug][0] {
        "title": Post_Posts,
        "imageUrl": image.asset->url,
        content,
        "author": author->{
          name,
          bio
        },
        publishedAt
      }`;

      try {
        setIsLoading(true);
        const fetchedPost = await client.fetch<BlogPost>(query, { slug });
        setPost(fetchedPost);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5">{post.title}</h1>
      {post.imageUrl && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="prose max-w-none">
        <PortableText value={post.content} />
      </div>
      <footer className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-gray-700">By {post.author.name}</p>
        <p className="text-gray-500 text-sm">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </footer>
    </article>
  );
};

export default BlogPostPage;