import React from 'react';
import { Card, Text } from 'react-native-elements';

const DataCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Text>Date: {data.date}</Text>
        <Text>House Number: {data.houseNumber}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default DataCard;
