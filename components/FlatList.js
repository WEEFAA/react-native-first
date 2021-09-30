import React from 'react'
import { FlatList, Text } from 'react-native'

export const Push = function ({count = 0, ...props}) {
  const data = Array(count)
    .fill(0)
    .map((_, index) => index + 1);

  const renderItem = ({item}) => {
    return (
      <Text
        children={`Item ${item}`}
        style={{fontSize: 24, width: '100%', textAlign: 'left'}}
      />
    );
  };
  return <FlatList {...props} data={data} renderItem={renderItem} />;
};
