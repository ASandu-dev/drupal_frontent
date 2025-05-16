// lib/drupal.ts

import type { DrupalBlogNode, DrupalJsonApiResponse } from "../types/drupal"; // Adjust the path if needed
import { NextDrupal } from "next-drupal";

export interface BlogPostCard {
  id: string;
  title: string;
  slug: string;
  image: string | null;
}



// Define the structure for a single blog post's full content
export interface BlogPostContent {
  title: string;
  body: string; // The raw HTML body
}

// Base URL for your Drupal JSON API
const DRUPAL_BASE_URL = "https://andreisandu.net";

// --- Data Fetching Functions ---

// Fetch a list of all blog posts for the index page
export const getBlogPosts = async (): Promise<BlogPostCard[]> => {
  const res = await fetch(
    `${DRUPAL_BASE_URL}/jsonapi/node/article?include=field_image&fields[node--article]=title,path,field_image&fields[file--file]=uri`,
    {
      headers: {
        Accept: "application/vnd.api+json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error(
      `Failed to fetch blog posts: ${res.status} ${res.statusText}`
    );
    throw new Error("Failed to fetch blog posts");
  }

  const json: DrupalJsonApiResponse<DrupalBlogNode> = await res.json();

  // Build a lookup for included images
  const imageMap = new Map<string, string>();
  for (const item of json.included || []) {
    if (item.type === "file--file") {
      const id = item.id;
      const uri = item.attributes.uri.url; // .url gives the public path
      imageMap.set(id, `${DRUPAL_BASE_URL}${uri}`);
    }
  }

  return json.data.map((node) => {
    const imageId = node.relationships?.field_image?.data?.id;
    const imageUrl = imageId && imageMap.get(imageId) ? imageMap.get(imageId)! : null;


    return {
      id: node.id,
      title: node.attributes.title,
      slug: node.attributes.path.alias.replace("/pages/", ""),
      image: imageUrl,
    };
  });
};

// lib/drupal.ts

export const drupal = new NextDrupal("https://andreisandu.net");


export const getPostById = async (id: string): Promise<BlogPostContent | null> => {
  try {
    const node = await drupal.getResource("node--article", id);
    return {
      title: node.title,
      body: node.body?.value || "",
    };
  } catch (err) {
    console.error("Error in getPostById with NextDrupal:", err);
    return null;
  }
};




