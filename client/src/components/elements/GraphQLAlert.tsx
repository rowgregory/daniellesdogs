import React, { FC, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorAlertIcon } from '../../components/svg/ErrorAlertIcon';

interface GraphQLAlertProps {
  graphqlErrors: any;
  setGraphQLErrors: any;
}

const GraphQLAlert: FC<GraphQLAlertProps> = ({
  graphqlErrors,
  setGraphQLErrors,
}) => {
  useEffect(() => {
    if (graphqlErrors?.length > 0) {
      setTimeout(() => {
        setGraphQLErrors([]);
      }, 5000);
    }
  }, [graphqlErrors, setGraphQLErrors]);
  return graphqlErrors?.map((error: any, i: number) => (
    <Alert variant='danger' key={i}>
      {error?.message}
      <ErrorAlertIcon />
    </Alert>
  ));
};

export default GraphQLAlert;
