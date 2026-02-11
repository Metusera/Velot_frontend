import { gql } from '@apollo/client';

export const ENROLL_IN_PROGRAM = gql`
  mutation EnrollInProgram($programId: ID!) {
    enrollInProgram(programId: $programId) {
      success
      message
      requiresPayment
      enrollment {
        id
        status
        statusDisplay
        enrolledAt
        progressPercentage
        paymentStatus
        paymentAmount
        program {
          id
          title
          slug
          price
        }
      }
    }
  }
`;

export const COMPLETE_LESSON = gql`
  mutation CompleteLesson($lessonId: ID!, $timeSpentMinutes: Int) {
    completeLesson(lessonId: $lessonId, timeSpentMinutes: $timeSpentMinutes) {
      success
      message
      lessonProgress {
        id
        isCompleted
        completedAt
        timeSpentMinutes
      }
      enrollment {
        id
        progressPercentage
        status
      }
    }
  }
`;

export const DROP_PROGRAM = gql`
  mutation DropProgram($enrollmentId: ID!) {
    dropProgram(enrollmentId: $enrollmentId) {
      success
      message
      enrollment {
        id
        status
        statusDisplay
      }
    }
  }
`;
