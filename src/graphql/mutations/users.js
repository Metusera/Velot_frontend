import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $fullName: String!
    $password: String!
    $role: String!
    $isActive: Boolean
  ) {
    createUser(
      email: $email
      fullName: $fullName
      password: $password
      role: $role
      isActive: $isActive
    ) {
      success
      message
      user {
        id
        email
        fullName
        role
        roleDisplay
        isActive
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $fullName: String
    $role: String
    $isActive: Boolean
  ) {
    updateUser(
      id: $id
      fullName: $fullName
      role: $role
      isActive: $isActive
    ) {
      success
      message
      user {
        id
        email
        fullName
        role
        roleDisplay
        isActive
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;
