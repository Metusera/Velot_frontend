import { gql } from '@apollo/client';

export const GET_PENDING_INVITATIONS = gql`
  query GetPendingInvitations {
    pendingInvitations {
      id
      email
      fullName
      role
      roleDisplay
      status
      statusDisplay
      createdAt
      expiresAt
      isExpired
      isValid
      invitedBy {
        id
        fullName
        email
      }
    }
  }
`;

export const GET_ALL_INVITATIONS = gql`
  query GetAllInvitations($status: String) {
    allInvitations(status: $status) {
      id
      email
      fullName
      role
      roleDisplay
      status
      statusDisplay
      createdAt
      expiresAt
      acceptedAt
      isExpired
      isValid
      invitedBy {
        id
        fullName
        email
      }
    }
  }
`;

export const GET_INVITATION_BY_TOKEN = gql`
  query GetInvitationByToken($token: String!) {
    invitationByToken(token: $token) {
      id
      email
      fullName
      role
      roleDisplay
      status
      statusDisplay
      createdAt
      expiresAt
      isExpired
      isValid
      invitedBy {
        id
        fullName
        email
      }
    }
  }
`;
