import React from 'react';
import { Text } from 'react-native'
import { Container } from './../components/Container'

export default props => {
  return (
    <Container {...props}>
        <Text>HELLO FROM DETAILS PAGE</Text>
    </Container>
  );
};
