/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { FC } from "react";
import {  StyleSheet, View } from "react-native";
import { SectionContainer } from "./SectionContainer";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY, STALE_TIME } from "@/configs";
import { productApi } from "@/apis";
import { ProductItem } from "@/components";
import { navigate } from "@/navigators";
import { QrProduct } from "@/interfaces";

export const NewArrival: FC = () => {
  const qr: QrProduct = {
    page: 1,
    limit: 8,
    status: true,
    sort: '-created_at',
  };
  const { data } = useQuery({
    queryKey: [QR_KEY.product, qr],
    queryFn: () => productApi.findAll(qr),
    staleTime: STALE_TIME,
  });
  return (
    <SectionContainer title="New Arrivals">
      <View style={style.listCnt}>
        {
          data?.context.data?.map(i => (
            <View style={style.itemCnt} key={i.id}>
              <ProductItem
                onPress={() => navigate('ProductDetail', { id: i.id, state: i })}
                item={i}
              />
            </View>
          ))
        }
      </View>
    </SectionContainer>
  );
};

const style = StyleSheet.create({
  listCnt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemCnt: {
    width: '50%',
    padding: 4,
    marginBottom: 8,
  },
});


