/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { FButton, FButtonIcon, Header } from '@/components';
import React, { FC, useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, View } from 'react-native';
import { signSt } from './style';
import { Formik } from 'formik';
import { StatusBar } from 'react-native';
import { color, row } from '@/themes';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/apis';
import CheckBox from '@react-native-community/checkbox';
import { Svg } from '@/assets';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { storage } from '@/utils';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EX_AT } from '@/constants';
import { useProfileStore } from '@/stores/zustand';
import { ZProfileState } from '@/stores/zustand/type';

const signInSchema = Yup.object({
  email: Yup.string().required('Vui lòng nhập email'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
});

export const SignInScreen: FC = () => {
  const navigate = useNavigation();
  const [getProfile] = useProfileStore((state:ZProfileState) => [state.getProfile]);
  const [showPw, setShowPw] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: { email: string, password: string }) => authApi.login(body),
    onSuccess: async (data) => {
      const {accessToken, refreshToken, token_expired_at} = data.context;
      await storage.setItem(ACCESS_TOKEN, accessToken);
      await storage.setItem(REFRESH_TOKEN, refreshToken);
      await storage.setItem(TOKEN_EX_AT, token_expired_at);
      getProfile();
      navigate.goBack();
    },
    onError: async (error) => {
      const err = error as AxiosError<{ message: string, statusCode: number }>;
      Alert.alert(
        'Thông báo',
        err.response?.data?.message || '',
        [
          {
            text: 'Ok',
            style: 'destructive',
          },
          err.response?.data?.statusCode === 404 ?
            {
              text: 'Đăng ký tài khoản',
              style: 'default',
            } : {},
        ],
      );
    },
  });
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={color.white} />
      <Header title="Đăng nhập" />
      <View style={signSt.cnt}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={values => mutate(values)}
        >
          {({ handleChange, handleBlur, values, handleSubmit, errors, touched }) => (
            <View style={signSt.formCnt}>
              <View style={signSt.formRow}>
                <TextInput
                  style={signSt.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email..."
                />
                {
                  touched.email && errors.email &&
                  <Text style={signSt.errorText}>{errors.email}</Text>
                }
              </View>
              <View style={signSt.formRow}>
                <TextInput
                  style={signSt.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Mật khẩu..."
                  secureTextEntry={!showPw}
                />
                {
                  touched.password && errors.password &&
                  <Text style={signSt.errorText}>{errors.password}</Text>
                }
                <FButtonIcon
                  onPress={() => setShowPw(!showPw)}
                  style={signSt.showPassBtn} icon={showPw ? <Svg.IcEye /> : <Svg.IcEyeCrossed />}
                />
              </View>
              <View style={signSt.rememberCnt}>
                <View style={{ ...row }} >
                  <CheckBox
                    style={{ width: 20, height: 20 }}
                    boxType="square"
                    onAnimationType="fade"
                    lineWidth={2}
                    onCheckColor={color.primary}
                    onTintColor={color.primary}
                  />
                  <Text style={signSt.rememberLabel}>Ghi nhớ đăng nhập</Text>
                </View>
                <Text style={signSt.forgot}>Quên mật khẩu ?</Text>
              </View>
              <FButton onPress={() => handleSubmit()} loading={isLoading} title="Đăng nhập" />
              <Text style={signSt.textSignUp}>Bạn chưa có tài khoản?
                <Text style={{ fontWeight: '600', textDecorationLine: 'underline' }}>
                  Đăng ký ngay
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};
