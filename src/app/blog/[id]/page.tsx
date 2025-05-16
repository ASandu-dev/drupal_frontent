// src/app/blog/[id]/page.tsx

import { notFound } from "next/navigation";
// Make sure your imports for getPostById and BlogPostContent are correct
import { getPostById, BlogPostContent } from "../../../../lib/drupal"; // Adjust the relative path as needed
import { Container } from "@mui/material"; // Assuming you use Material UI

interface BlogPostPageProps {
  // Correctly type params as a Promise that resolves to { id: string }
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await the params promise to get the actual parameters
  const awaitedParams = await params;
  const { id } = awaitedParams; // Destructure the id from the resolved object

  const post: BlogPostContent | null = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <Container maxWidth={"md"} className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">{post.title}</h1>
      <article
        className="prose prose-blue"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </Container>
  );
}