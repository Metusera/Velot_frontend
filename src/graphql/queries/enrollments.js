import { gql } from '@apollo/client';

export const GET_MY_ENROLLMENTS = gql`
  query GetMyEnrollments($status: String) {
    myEnrollments(status: $status) {
      id
      status
      statusDisplay
      enrolledAt
      completedAt
      progressPercentage
      paymentStatus
      paymentAmount
      program {
        id
        title
        slug
        description
        thumbnail
        duration
        level
        levelDisplay
        category {
          id
          name
        }
      }
    }
  }
`;

export const GET_ENROLLMENT_DETAILS = gql`
  query GetEnrollmentDetails($enrollmentId: ID!) {
    enrollmentDetails(enrollmentId: $enrollmentId) {
      id
      status
      statusDisplay
      enrolledAt
      completedAt
      progressPercentage
      completedLessonsCount
      totalLessonsCount
      program {
        id
        title
        slug
        description
        thumbnail
      }
    }
  }
`;

export const GET_PROGRAM_CURRICULUM = gql`
  query GetProgramCurriculum($programId: ID!) {
    programCurriculum(programId: $programId) {
      id
      title
      description
      order
      lessonCount
      totalDurationMinutes
      lessons {
        id
        title
        content
        durationMinutes
        order
        videoUrl
        isPreview
      }
    }
  }
`;

export const IS_ENROLLED = gql`
  query IsEnrolled($programId: ID!) {
    isEnrolled(programId: $programId) {
      id
      status
      progressPercentage
    }
  }
`;
