/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { color } from '@/themes';
import { screen } from '@/utils';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';

export interface FSliderProps<ItemT> extends FlatListProps<ItemT> {
  afterChange?: (index: number) => void;
  currentChange?: (index: number) => void;
  beforeChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showPage?: boolean;
}

export const FSlider = forwardRef<FlatList, FSliderProps<any>>((props, ref) => {
  const {
    afterChange = () => { },
    beforeChange = () => { },
    currentChange = () => { },
    autoPlay,
    autoPlayDelay = 1000,
    showPage = true,
  } = props;
  const initRef = useRef<FlatList>(null);
  const [actIndex, setActIndex] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screen.width);
    afterChange(index - 1);
    currentChange(index);
    beforeChange(index + 1);
    setActIndex(index);
  };
  useEffect(() => {
    let interval = setInterval(() => {
      if (autoPlay && props.data) {
        if (actIndex === props.data.length - 1) {
          initRef.current?.scrollToIndex({
            index: 0, animated: true,
          });
        } else {
          initRef.current?.scrollToIndex({
            index: actIndex + 1, animated: true,
          });
        }
      }
    }, autoPlayDelay);
    return () => clearInterval(interval);
  });
  return (
    <View style={style.cnt} >
      <FlatList
        {...props}
        ref={autoPlay ? initRef : ref}
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
      {
        showPage &&
        <View style={style.page} >
          <Text style={{ color: color.primary, fontWeight: '500', fontSize: 14 }}>{actIndex + 1}/{props.data?.length}</Text>
        </View>
      }
    </View>
  );
});

const style = StyleSheet.create({
  cnt: {
    position: 'relative',
  },
  page: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: color.grey,
    paddingVertical: 1,
    paddingHorizontal: 8,
    color: color.primary,
    borderRadius: 2,
    right: 8,
    bottom: 8,
  },
});
