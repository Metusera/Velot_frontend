import { gql } from '@apollo/client';

export const INVITE_USER = gql`
  mutation InviteUser($email: String!, $fullName: String!, $role: String!) {
    inviteUser(email: $email, fullName: $fullName, role: $role) {
      success
      message
      invitation {
        id
        email
        fullName
        role
        roleDisplay
        status
        createdAt
        expiresAt
      }
    }
  }
`;

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($token: String!, $password: String!) {
    acceptInvitation(token: $token, password: $password) {
      success
      message
      user {
        id
        email
        fullName
        role
        roleDisplay
      }
    }
  }
`;

export const RESEND_INVITATION = gql`
  mutation ResendInvitation($invitationId: ID!) {
    resendInvitation(invitationId: $invitationId) {
      success
      message
      invitation {
        id
        email
        status
      }
    }
  }
`;

export const CANCEL_INVITATION = gql`
  mutation CancelInvitation($invitationId: ID!) {
    cancelInvitation(invitationId: $invitationId) {
      success
      message
      invitation {
        id
        email
        status
      }
    }
  }
`;
