import React from 'react';
import {Animated, Dimensions, Modal, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles/colors';
import ProgressBar from './ProgressBar';

const {width, height} = Dimensions.get('window');

export function FlixLoaderSimple() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <ProgressBar
          color={colors.primary}
          indeterminate
          indeterminateAnimationDuration={750}
          useNativeDriver
          height={8}
        />
      </View>
    </View>
  );
}

const Ring = ({delay, size, duration = 3000}) => {
  const ring = React.useRef(new Animated.Value(0)).current;
  const ringStyle = {
    opacity: ring.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        scale: ring.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 4],
        }),
      },
    ],
  };
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(ring, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        duration,
      }),
    ).start();
  }, [ring]);
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size || 80,
          height: size || 80,
          borderRadius: size / 2,
          borderColor: colors.primary,
          borderWidth: size / 6,
        },
        ringStyle,
      ]}
    />
  );
};

export function FlixLoaderCircle({delay = 750, size = 40}) {
  return (
    <View
      style={{
        width: size * 4,
        height: size * 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Ring duration={delay * 4} delay={0} size={size} />
      <Ring duration={delay * 4} delay={delay * 1} size={size} />
      <Ring duration={delay * 4} delay={delay * 2} size={size} />
      <Ring duration={delay * 4} delay={delay * 3} size={size} />
    </View>
  );
}

export default class FlixLoader extends React.PureComponent {
  static Loader;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: null,
      error: false,
    };
    FlixLoader.Loader = this;
  }

  static show(message, callback = () => {}) {
    FlixLoader.Loader.showLoading(message, callback);
  }

  static hide(callback = () => {}) {
    FlixLoader.Loader.hideLoading(callback);
  }

  /**
   * @param {String} message
   * @param {Object[]} buttons
   * @param {string} buttons[].text
   * @param {function} buttons[].onPress
   *
   * @typedef Props
   * @prop {('error'|'alert')} status
   * @param {import('lottie-react-native').AnimatedLottieViewProps & Props} lottieOptions
   */
  static showError(message, buttons, lottieOptions) {
    FlixLoader.Loader.showError(message, buttons, lottieOptions);
  }

  showLoading(message, callback) {
    this.setState({message, isLoading: true}, callback);
  }

  /**
   * @param {String} message
   * @param {Object[]} buttons
   * @param {string} buttons[].text
   * @param {function} buttons[].onPress
   *
   * @typedef Props
   * @prop {('error'|'alert')} status
   * @param {import('lottie-react-native').AnimatedLottieViewProps & Props} lottieOptions
   */
  showError(message, buttons, lottieOptions) {
    this.setState(prevS => ({
      ...prevS,
      error: {
        message,
        buttons,
        lottieOptions,
      },
    }));
  }

  hideLoading(callback) {
    this.setState({isLoading: false}, callback);
  }

  render() {
    return (
      <Modal visible={this.state.isLoading} transparent={!this.state.error} statusBarTranslucent>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'rgba(92,163,210,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              backgroundColor: colors.black,
              alignItems: 'center',
            }}
          >
            <ProgressBar
              color={colors.primary}
              indeterminate
              indeterminateAnimationDuration={750}
              useNativeDriver
              height={8}
            />
            <Text fontSize="L" color={colors.primary} style={{textAlign: 'center'}}>
              {this.state.message || 'Loading ...'}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
