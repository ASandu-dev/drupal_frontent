// src/app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts, BlogPostCard } from "../../../lib/drupal";
import Image from "next/image";
import Box from "@mui/material/Box";

export default async function BlogPage() {
  const posts: BlogPostCard[] = await getBlogPosts();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Blog</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="block h-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-blue-200 p-4"
            >
              <Box className="w-full h-full">
                <Image
                  src={`${post.image}`}
                  alt="alt"
                  width={450}
                  height={450}
                  className="object-cover rounded-xl"
                />
                <h2 className="text-lg font-bold text-blue-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">Read more &rarr;</p>
              </Box>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
