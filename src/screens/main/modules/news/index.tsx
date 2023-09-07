/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { FButton, FSlider } from '@/components';
import { screen } from '@/utils';
import React, { useRef } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const data = [
  { img: 'https://harinail.myspa.vn/files/harinail/service/20230803171213.jpg', name: 'hinh 1' },
  { img: 'https://ivysaigon.myspa.vn/files/ivysaigon/service/20230813113910.jpg', name: 'hinh 2' },
  { img: 'https://tropical.myspa.vn/files/tropical/service/20230211084045.jpg', name: 'hinh 3' },
  { img: 'https://lysretreat.myspa.vn/files/lysretreat/service/20230829161355.jpg', name: 'hinh 4' },
  { img: 'https://pmt.myspa.vn/files/pmt/service/20230814092949.jpg', name: 'hinh 5' },
];

export const News = () => {
  const slideRef = useRef<FlatList>(null);
  const renderItem = ({ item }: any) => {
    return (
      <View style={{ padding: 10 }} >
        <Image
          source={{ uri: item.img }}
          style={{ height: 200, width: screen.width - 20 }}
        />
      </View>
    );
  };
  return (
    <View>
      <FButton
        onPress={() => slideRef?.current?.scrollToIndex({ index: 3, animated: true })}
        title="test"
      />
      <FSlider
        ref={slideRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        autoPlay={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({

});
