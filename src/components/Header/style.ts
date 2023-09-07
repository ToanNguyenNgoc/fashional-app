import {color} from '@/themes';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  cnt: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: color.white,
  },
  title: {
    color: color.primary,
    fontSize: 20,
    fontWeight: '600',
  },
  right: {
    minWidth: 34,
  },
});
