/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { IProduct } from '@/interfaces';
import { color } from '@/themes';
import { formatPrice } from '@/utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ProductItemProps extends TouchableOpacityProps {
  item: IProduct
}

export const ProductItem = (props: ProductItemProps) => {
  const { item } = props;
  return (
    <TouchableOpacity {...props} style={style.productItem}>
      <View style={style.productItemHead}>
        <View style={style.productItemHeadLeft}>
          <Text style={[style.productItemHeadLeftText]} >{item.tag?.name}</Text>
          <Text style={[style.productItemHeadLeftText, { marginLeft: 4 }]} >{item.category?.name}</Text>
        </View>
      </View>
      <FastImage
        source={{
          uri: item.thumbnail_url,
          priority: FastImage.priority.low,
        }}
        style={style.productItemImg}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={style.detail}>
        <Text style={style.detailName}>{item.name}</Text>
        <View style={style.detailPriceCnt}>
          {
            item.price_special < item.price ?
              <>
                <Text style={style.specialPrice}>{formatPrice(item.price_special)}</Text>
                <Text style={style.price}>{formatPrice(item.price)}</Text>
              </>
              :
              <Text style={style.specialPrice}>{formatPrice(item.price)}</Text>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  productItem: {
    width: '100%',
    position: 'relative',
    backgroundColor: color.white,
  },
  productItemHead: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
    top: -3,
    left: -2,
  },
  productItemHeadLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  productItemHeadLeftText: {
    backgroundColor: color.primary,
    color: color.white,
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 11,
  },
  productItemImg: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  detail: {
    padding: 4,
    paddingTop: 6,
  },
  detailName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: color.primary,
  },
  detailPriceCnt: {
    marginTop: 4,
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
  },
  specialPrice: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
    color: color.primary,
  },
  price: {
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 8,
    color: color.grayText,
    lineHeight: 18,
    textDecorationLine: 'line-through',
  },
});
