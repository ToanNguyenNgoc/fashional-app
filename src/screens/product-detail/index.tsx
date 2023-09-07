/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { RootStackParamList } from '@/navigators/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useRef } from 'react';
import { Animated, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { QR_KEY } from '@/configs';
import { productApi } from '@/apis';
import { FButtonIcon, Header } from '@/components';
import { Svg } from '@/assets';
import { HEADER_SCROLL_DISTANCE, styles } from './style';
import { Detail, Gallery } from './modules';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>


export const ProductDetailScreen: FC<Props> = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  const { data } = useQuery({
    queryKey: [QR_KEY.product, route.params.id],
    queryFn: () => productApi.findProductById(route.params.id),
    enabled: !!route.params.id,
  });
  const product = route.params.state || data?.context;
  const { data: dataGalleries } = useQuery({
    queryKey: [QR_KEY.gallery, route.params.id],
    queryFn: () => productApi.findProductGalleries(route.params.id),
  });


  return (
    <SafeAreaView style={styles.saveArea}>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}
        translucent
        backgroundColor="transparent"
      />
      {product && <Detail scrollY={scrollY} product={product} />}
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.View
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
        >
          <Gallery
            images={
              [product?.thumbnail_url]
                .concat(dataGalleries?.context.data.map(i => i.media.original_url) || [])
                .filter(Boolean)
            }
          />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.topBar}>
        <HeaderDetail />
      </Animated.View>
    </SafeAreaView>
  );
};
const HeaderDetail: FC = () => {
  return (
    <Header
      style={{ backgroundColor: 'transparent' }}
      title=""
      left={
        <View style={styles.cartBtnCnt}>
          <FButtonIcon
            icon={<Svg.IcShoppingCartBlack />}
          />
          <Text style={styles.cartQuantity}>9+</Text>
        </View>
      }
    />
  );
};
