import React from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles/colors';

const {width, height} = Dimensions.get('window');
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const Welcome = props => {
  const Pages = [
    {id: 1, title: 'Welcome Folks!', desc: 'Thank you for using React Native Flix Template', color: '#a6e4d0'},
    {id: 2, title: 'Useful Library!', desc: 'Using popular React Native Library', color: '#fdeb93'},
    {id: 3, title: 'Go Future!', desc: 'You can start using my own screen or customize your own', color: '#e9bcbe'},
  ];
  const [Index, setIndex] = React.useState(0);
  const animatedScroll = React.useRef(new Animated.Value(0)).current;
  const refFlatlist = React.useRef(null);

  const onScrollEnd = e => {
    const currentIndex = Index;
    const contentOffset = e.nativeEvent.contentOffset.x;
    setIndex(Math.abs((contentOffset / width).toFixed()));
  };

  const handleButtonPrevNext = param => {
    if (Index === Pages.length - 1 && param === 'next') return props.navigation.navigate('Login');
    refFlatlist.current.scrollToIndex({index: param === 'next' ? Index + 1 : Index - 1});
  };

  const RenderItem = ({item}) => {
    return (
      <View style={{width, height, padding: 14, backgroundColor: item.color, justifyContent: 'center'}}>
        <Text style={{fontSize: 24, marginBottom: 14, fontWeight: 'bold', textAlign: 'center'}}>{item.title}</Text>
        <Text style={{textAlign: 'center'}}>{item.desc}</Text>
      </View>
    );
  };

  const RenderIndicator = () => {
    const indicator = Pages.map((el, index) => {
      const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
      const interpolateFunct = outputRange =>
        animatedScroll.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp',
        });
      const resizeWidth = interpolateFunct([10, 20, 10]);
      const setOpacity = interpolateFunct([0.3, 1, 0.3]);
      return (
        <Animated.View
          key={'dot' + el + index.toString()}
          style={{
            width: resizeWidth,
            height: 10,
            backgroundColor: colors.red,
            opacity: setOpacity,
            borderRadius: 10 / 2,
            marginHorizontal: 5,
          }}
        />
      );
    });
    return (
      <View style={Styles.containerIndicator}>
        {Index !== 0 && (
          <TouchableOpacity onPress={() => handleButtonPrevNext('prev')} style={[Styles.buttonPrevNext, {left: '5%'}]}>
            <Text style={Styles.textPrevNext}>Prev</Text>
          </TouchableOpacity>
        )}
        <View style={Styles.containerDot}>{indicator}</View>
        <TouchableOpacity onPress={() => handleButtonPrevNext('next')} style={[Styles.buttonPrevNext, {right: '5%'}]}>
          <Text style={Styles.textPrevNext}>{Index !== Pages.length - 1 ? 'Next' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AnimatedFlatlist
        ref={refFlatlist}
        data={Pages}
        renderItem={RenderItem}
        pagingEnabled
        horizontal
        onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: animatedScroll}}}], {useNativeDriver: false})}
      />
      <RenderIndicator />
    </View>
  );
};

export default Welcome;

const Styles = StyleSheet.create({
  buttonPrevNext: {
    backgroundColor: colors.primary,
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    position: 'absolute',
  },
  textPrevNext: {fontSize: 16, color: colors.whiteDark},
  containerIndicator: {position: 'absolute', bottom: height * 0.1, width, justifyContent: 'center'},
  containerDot: {flexDirection: 'row', flex: 1, alignSelf: 'center'},
});
