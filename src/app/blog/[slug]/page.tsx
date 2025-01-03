'use client';

import { client } from '@/sanity/lib/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

interface BlogPost {
  title: string;
  content: TypedObject | TypedObject[]; // Updated type for Portable Text
  image: {
    asset: {
      url: string;
    };
  };
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
      const query = `*[_type == "blogPosts" && slug.current == $slug][0]{
        title,
        content,
        image{
          asset->{
            url
          }
        },
        author->{
          name,
          bio
        },
        publishedAt
      }`;

      try {
        setIsLoading(true);
        const fetchedPost = await client.fetch(query, { slug });
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
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
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5">{post.title}</h1>
      {post.image && (
        <img
          src={post.image.asset.url}
          alt={post.title}
          className="w-full h-auto mb-5"
        />
      )}
      <div className="prose max-w-none">
        <PortableText value={post.content} />
      </div>
      <div className="mt-5 text-sm text-gray-500">
        <p>By {post.author.name}</p>
        <p>{new Date(post.publishedAt).toDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;