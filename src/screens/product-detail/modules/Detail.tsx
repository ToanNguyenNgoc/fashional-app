/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { productApi } from '@/apis';
import { Svg } from '@/assets';
import { FButton, FButtonIcon } from '@/components';
import { QR_KEY } from '@/configs';
import { IProduct, IProductBranch, IProductSize } from '@/interfaces';
import { HEADER_MAX_HEIGHT } from '@/screens/product-detail/style';
import { color } from '@/themes';
import { formatPrice, screen } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React, { FC, memo, useState } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import RenderHTML from 'react-native-render-html';

interface ISelect {
  size: IProductSize | null,
  quantity: number
}

export const Detail: FC<{ product: IProduct, scrollY: Animated.Value }> = ({ product, scrollY }) => {
  const { data: dataSizes } = useQuery({
    queryKey: [QR_KEY.product_size, product.id],
    queryFn: () => productApi.findProductSizes(product.id),
  });
  const { data: dataBranches } = useQuery({
    queryKey: [QR_KEY.product_branch, product.id],
    queryFn: () => productApi.findProductBranches(product.id, {
      status: true,
    }),
  });
  const branchMaxQuantity = dataBranches?.context.data.sort((a, b) => b.quantity - a.quantity)[0]?.quantity;
  const [select, setSelect] = useState<ISelect>({ size: null, quantity: 1 });
  return (
    <React.Fragment>
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={style.cnt}>
          <Text style={style.nameTxt}>{product.name}</Text>
          <View style={style.priceCnt}>
            {
              product.price_special < product.price &&
              <View style={style.percentCnt}>
                <Text style={style.percentTxt}>
                  {Math.ceil(100 - (product.price_special / product.price * 100))}% Off
                </Text>
              </View>
            }
            <View style={style.priceSaleCnt}>
              <Text style={style.priceSpecial}>{formatPrice(product.price_special)}</Text>
              {
                product.price_special < product.price &&
                <Text style={style.priceOrigin}>{formatPrice(product.price)}</Text>
              }
            </View>
          </View>
          <View style={style.sectionItem}>
            <Text style={style.sectionTitle}>Size/loại</Text>
            <View style={style.sizeCnt}>
              {
                dataSizes?.context.data.map((i) => (
                  <View style={style.sizeItemCnt} key={i.id}>
                    <Text
                      onPress={() => i.status && setSelect({ ...select, size: i })}
                      style={[
                        style.sizeItemTxt,
                        !i.status ? { color: color.grey_1, borderColor: color.grey_1 } : {},
                        i.id === select.size?.id ? { backgroundColor: color.primary, color: color.white } : {},
                      ]}
                    >
                      {i.name}
                    </Text>
                  </View>
                ))
              }
            </View>
          </View>
          <View style={style.sectionItem}>
            <Text style={style.sectionTitle}>Số lượng</Text>
            <View style={style.quantityCnt}>
              <TouchableOpacity
                onPress={() => select.quantity > 1 && setSelect({ ...select, quantity: select.quantity - 1 })}
                style={style.quantityBtn}
              >
                <Text style={style.quantityBtnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 14, color: color.primary }}>{select.quantity}</Text>
              <TouchableOpacity
                onPress={() => branchMaxQuantity && select.quantity < branchMaxQuantity && setSelect({ ...select, quantity: select.quantity + 1 })}
                style={[style.quantityBtn, { backgroundColor: color.primary }]}
              >
                <Text style={[style.quantityBtnTxt, { color: color.white }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.sectionItem}>
            <Text style={style.sectionTitle}>Mô tả</Text>
            <ShortContent content={product.short_content} />
          </View>
          <View style={style.sectionItem}>
            <Text style={style.sectionTitle}>Chi nhánh</Text>
            <Branch branches={dataBranches?.context.data} />
          </View>
        </View>
      </Animated.ScrollView>
      <View style={style.addCartCnt}>
        <View style={style.addCartBtnCnt}>
          <FButtonIcon
            style={style.addCartBtn}
            icon={<Svg.IcAddCartBlack />}
          />
        </View>
        <FButton
          style={style.buyNowBtn}
          title="Mua ngay"
        />
      </View>
    </React.Fragment>
  );
};
const ShortContent = memo(({ content }: { content: string | null }) => {
  return (
    <RenderHTML
      baseStyle={{ paddingHorizontal: 8 }}
      tagsStyles={{
        img: {
          width: screen.width - 16,
        },
        p: {
          color: color.primary,
        },
        span: {
          color: color.primary,
        },
      }}
      source={{
        html: content || '',
      }}
      contentWidth={screen.width}
      enableExperimentalMarginCollapsing
    />
  );
});
const Branch: FC<{ branches?: IProductBranch[] }> = ({ branches = [] }) => {
  return (
    <View style={style.branchCnt}>
      {
        branches.map(item => (
          <View key={item.branch.id} style={style.branchItem}>
            <Text style={style.branchName}>
              {item.branch.name},{item.branch.ward.name},{item.branch.district.name},{item.branch.province.name},
            </Text>
            <Text style={style.branchStatus}>
              {item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
            </Text>
          </View>
        ))
      }
    </View>
  );
};


const style = StyleSheet.create({
  cnt: {
    marginTop: Platform.OS === 'android' ? 50 : 0,
    paddingHorizontal: 8,
    marginBottom:20,
  },
  nameTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: color.primary,
  },
  priceCnt: {
    marginTop: 8,
  },
  percentCnt: {
    backgroundColor: color.orange,
    paddingVertical: 4,
    width: 96,
    borderRadius: 6,
    marginBottom: 8,
  },
  percentTxt: {
    color: color.white,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  priceSaleCnt: {
    display: 'flex',
    flexDirection: 'row',
  },
  priceSpecial: {
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 22,
    color: color.primary,
  },
  priceOrigin: {
    lineHeight: 22,
    marginLeft: 6,
    color: color.grayText,
    textDecorationColor: color.grayText,
    textDecorationLine: 'line-through',
  },
  sectionItem: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: color.primary,
    marginBottom: 8,
  },
  sizeCnt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeItemCnt: {
    width: (screen.width - 16) / 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  sizeItemTxt: {
    paddingVertical: 8,
    color: color.primary,
    borderColor: color.primary,
    borderWidth: 1,
    textAlign: 'center',
  },
  quantityCnt: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 4,
  },
  quantityBtnTxt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: color.primary,
  },
  addCartCnt: {
    paddingTop: 6,
    paddingHorizontal: 8,
    backgroundColor: color.white,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCartBtnCnt: {
    width: (screen.width - 16) * 0.33 - 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addCartBtn: {
    height: 44,
    width: 44,
  },
  buyNowBtn: {
    width: (screen.width - 16) * 0.66 - 6,
    paddingVertical: 12,
  },
  branchCnt: {
    padding: 8,
    backgroundColor: color.gray,
    borderRadius: 8,
  },
  branchItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  branchName: {
    width: (screen.width - 32) * 0.80,
    fontSize: 14,
    fontWeight: '400',
    color: color.primary,
    lineHeight: 20,
  },
  branchStatus: {
    fontSize: 13,
    color: color.yellow,
  },
});
