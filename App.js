import React from 'react';
import {View, ScrollView} from 'react-native';
import LocalAPI from './src/pages/LocalAPI';

export default function App() {
  return (
    <View>
      <ScrollView>
        <LocalAPI />
      </ScrollView>
    </View>
  );
}
