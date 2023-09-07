import {FSlider} from '@/components';
import {color} from '@/themes';
import {screen} from '@/utils';
import React, {FC, createRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface GalleryProps {
  images?: string[];
}

export const Gallery: FC<GalleryProps> = ({images = []}) => {
  const [index, setIndex] = useState(0);
  const sliderRef = createRef<FlatList>();
  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={style.itemImg}>
        <Image style={style.img} source={{uri: item}} />
      </View>
    );
  };
  const renderChild = ({item}: {item: string}) => {
    const i = images.indexOf(item);
    return (
      <TouchableOpacity
        onPress={() => {
          sliderRef.current?.scrollToIndex({index: i, animated: true});
          setIndex(i);
        }}
        style={[
          style.childItemCnt,
          index === i ? {borderColor: color.grayText} : {},
        ]}>
        <Image style={style.childImg} source={{uri: item}} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FSlider
        ref={sliderRef}
        currentChange={i => setIndex(i)}
        style={{height: screen.width}}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
      <FlatList
        data={images}
        renderItem={renderChild}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const style = StyleSheet.create({
  itemImg: {
    backgroundColor: color.grey,
  },
  img: {
    width: screen.width,
    resizeMode: 'cover',
    aspectRatio: 1 / 1,
  },
  childItemCnt: {
    marginTop: 2,
    marginLeft: 4,
    borderColor: color.white,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.grey,
  },
  childImg: {
    height: 80,
    aspectRatio: 1 / 1,
    borderRadius: 4,
  },
});
