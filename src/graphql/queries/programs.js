import { gql } from '@apollo/client';

export const GET_PUBLISHED_PROGRAMS = gql`
  query GetPublishedPrograms($category: String, $level: String) {
    publishedPrograms(category: $category, level: $level) {
      id
      title
      slug
      description
      category {
        id
        name
        slug
      }
      duration
      price
      level
      levelDisplay
      thumbnail
      status
      eventCount
      upcomingEventsCount
      createdAt
      publishedAt
    }
  }
`;

export const GET_PROGRAM_BY_SLUG = gql`
  query GetProgramBySlug($slug: String!) {
    programBySlug(slug: $slug) {
      id
      title
      slug
      description
      category {
        id
        name
        slug
      }
      duration
      price
      level
      levelDisplay
      thumbnail
      status
      statusDisplay
      eventCount
      upcomingEventsCount
      createdBy {
        id
        fullName
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const GET_ALL_PROGRAMS = gql`
  query GetAllPrograms {
    allPrograms {
      id
      title
      slug
      description
      category {
        id
        name
        slug
      }
      duration
      price
      level
      levelDisplay
      thumbnail
      status
      statusDisplay
      eventCount
      createdBy {
        id
        fullName
      }
      createdAt
      publishedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
      description
    }
  }
`;
