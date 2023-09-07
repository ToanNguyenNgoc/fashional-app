import {color} from '@/themes';
import {screen} from '@/utils';
import {StyleSheet} from 'react-native';

export const HEADER_MAX_HEIGHT = screen.width + 84;
export const HEADER_MIN_HEIGHT = 74;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.white,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: color.white,
  },
  topBar: {
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  cartBtnCnt: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#0000003b',
    marginRight: 8,
    position: 'relative',
  },
  cartQuantity: {
    backgroundColor: color.red,
    position: 'absolute',
    zIndex: 1,
    width: 22,
    height: 22,
    textAlign: 'center',
    lineHeight: 22,
    color: color.white,
    fontWeight: '500',
    borderRadius: 11,
    right: -6,
    top: -6,
  },
});
