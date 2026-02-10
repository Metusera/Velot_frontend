import { gql } from '@apollo/client';

export const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial(
    $name: String!
    $role: String!
    $text: String!
    $rating: Int
    $isActive: Boolean
    $order: Int
  ) {
    createTestimonial(
      name: $name
      role: $role
      text: $text
      rating: $rating
      isActive: $isActive
      order: $order
    ) {
      testimonial {
        id
        name
        role
        text
        rating
        isActive
        order
      }
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation UpdateTestimonial(
    $id: ID!
    $name: String
    $role: String
    $text: String
    $rating: Int
    $isActive: Boolean
    $order: Int
  ) {
    updateTestimonial(
      id: $id
      name: $name
      role: $role
      text: $text
      rating: $rating
      isActive: $isActive
      order: $order
    ) {
      testimonial {
        id
        name
        role
        text
        rating
        isActive
        order
      }
    }
  }
`;

export const DELETE_TESTIMONIAL = gql`
  mutation DeleteTestimonial($id: ID!) {
    deleteTestimonial(id: $id) {
      success
    }
  }
`;