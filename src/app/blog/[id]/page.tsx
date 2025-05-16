// src/app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import { getPostById, BlogPostContent } from "../../../../lib/drupal";
import { Container } from "@mui/material";

type BlogPostPageProps = {
  params: { id: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post: BlogPostContent | null = await getPostById(id);

  if (!post) return notFound();

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
