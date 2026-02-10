import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      email
      fullName
      role
      roleDisplay
      isActive
      dateJoined
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      email
      fullName
      role
      roleDisplay
      isActive
      dateJoined
    }
  }
`;

export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      id
      name
      role
      text
      rating
      image
      isActive
      order
    }
  }
`;
