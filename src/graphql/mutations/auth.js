import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
      refreshToken
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
