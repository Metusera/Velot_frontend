import { gql } from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation CreateProgram(
    $title: String!
    $description: String!
    $categoryId: ID!
    $duration: String!
    $price: Decimal!
    $level: String!
    $slug: String
    $isNew: Boolean
    $isHot: Boolean
    $isProfessional: Boolean
    $autoCalculateBadges: Boolean
  ) {
    createProgram(
      title: $title
      description: $description
      categoryId: $categoryId
      duration: $duration
      price: $price
      level: $level
      slug: $slug
      isNew: $isNew
      isHot: $isHot
      isProfessional: $isProfessional
      autoCalculateBadges: $autoCalculateBadges
    ) {
      success
      message
      program {
        id
        title
        slug
        status
      }
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation UpdateProgram(
    $id: ID!
    $title: String
    $description: String
    $categoryId: ID
    $duration: String
    $price: Decimal
    $level: String
    $slug: String
    $isNew: Boolean
    $isHot: Boolean
    $isProfessional: Boolean
    $autoCalculateBadges: Boolean
  ) {
    updateProgram(
      id: $id
      title: $title
      description: $description
      categoryId: $categoryId
      duration: $duration
      price: $price
      level: $level
      slug: $slug
      isNew: $isNew
      isHot: $isHot
      isProfessional: $isProfessional
      autoCalculateBadges: $autoCalculateBadges
    ) {
      success
      message
      program {
        id
        title
        slug
        status
      }
    }
  }
`;

export const PUBLISH_PROGRAM = gql`
  mutation PublishProgram($id: ID!) {
    publishProgram(id: $id) {
      success
      message
      program {
        id
        status
        statusDisplay
        publishedAt
      }
    }
  }
`;

export const UNPUBLISH_PROGRAM = gql`
  mutation UnpublishProgram($id: ID!) {
    unpublishProgram(id: $id) {
      success
      message
      program {
        id
        status
        statusDisplay
      }
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation DeleteProgram($id: ID!) {
    deleteProgram(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String, $slug: String) {
    createCategory(name: $name, description: $description, slug: $slug) {
      success
      message
      category {
        id
        name
        slug
      }
    }
  }
`;
