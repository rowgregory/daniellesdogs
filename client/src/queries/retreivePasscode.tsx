import { gql } from '@apollo/client';

export const RETREIVE_PASSCODE = gql`
  query retreivePasscode($passcodeAttempt: String) {
    retreivePasscode(passcodeAttempt: $passcodeAttempt)
  }
`;
