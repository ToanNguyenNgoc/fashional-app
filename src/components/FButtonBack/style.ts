import {color} from '@/themes';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  cnt: {
    backgroundColor: color.primary,
    width: 34,
    height: 34,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  icon: {
    marginLeft: 4,
  },
});
