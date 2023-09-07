import {color} from '@/themes';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  cnt: {
    backgroundColor: color.primary,
    paddingVertical: 14,
    borderRadius: 8,
  },
  textCnt: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  loadCnt: {
    width: '100%',
    height: '100%',
    backgroundColor: color.red,
    zIndex: 10,
  },
  text: {
    color: color.white,
    fontSize: 16,
    borderRadius: 8,
  },
});
