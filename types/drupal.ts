// types/drupal.ts

export interface DrupalJsonApiResponse<T> {
  data: T[];
  included?: DrupalIncluded[];
}

export interface DrupalIncluded {
  id: string;
  type: string;
  attributes: {
    uri: {
      url: string;
    };
  };
}


export interface DrupalBlogNode {
  id: string;
  type: string;
  attributes: {
    title: string;
    path: {
      alias: string;
    };
  };
  relationships?: {
    field_image?: {
      data?: {
        id: string;
        type: string;
      } | null;
    };
  };
}

