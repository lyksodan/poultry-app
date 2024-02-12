// SubmitButton.js

import React from 'react';
import { Button } from 'react-native-elements';

export default function SubmitButton({ saveDataToFirestore }) {
  return <Button title="Submit" onPress={saveDataToFirestore} />;
}
