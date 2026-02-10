import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
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

export const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      valid
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
