import {color, inputTheme, row} from '@/themes';
import {screen} from '@/utils';
import {StyleSheet} from 'react-native';

export const signSt = StyleSheet.create({
  cnt: {
    backgroundColor: color.white,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: screen.height,
  },
  formCnt: {
    paddingTop: 64,
  },
  formRow: {
    paddingBottom: 30,
    position: 'relative',
  },
  showPassBtn: {
    position: 'absolute',
    zIndex: 2,
    right: 4,
    top: 8,
  },
  errorText: {
    position: 'absolute',
    color: color.red,
    bottom: 12,
    fontSize: 11,
  },
  input: {
    ...inputTheme,
    width: screen.width - 24,
    backgroundColor: color.white,
    borderColor: color.primary,
    color: color.primary,
  },
  textSignUp: {
    textAlign: 'center',
    marginTop: 28,
    fontSize: 16,
    fontWeight: '400',
    color: color.primary,
  },
  rememberCnt: {
    ...row,
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  rememberLabel: {
    marginLeft: 6,
    marginTop: 2,
    color: color.primary,
  },
  forgot: {
    fontSize: 16,
    fontWeight: '500',
    color: color.primary,
  },
});
