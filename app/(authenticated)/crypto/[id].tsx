import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import CryptoHeader from './components/cryptoHeader';
import CategoryList from './components/categoryList';
import CryptoOverview from './components/cryptoOverview';


Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()
  const categories = ['Overview', 'News', 'Orders', 'Transactions'];
  const [activeIndex, setActiveIndex] = useState(0);
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
  const { state, isActive } = useChartPressState({ x:0, y:{ price: 0 }});

  if (!id) {
    return <Text>Invalid id</Text>
  }

  useEffect(() => {
    if (isActive) Haptics.selectionAsync();
  }, [isActive])

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ['tickers'],
    queryFn: async (): Promise<any[]> => fetch(`/api/tickers`).then((res) => res.json()),
  })

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: '',
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: '',
    };
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }}/>
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior='automatic'
        keyExtractor={(item) => item.title}
        sections={[{ data: [{ title: 'Chart' }] }]}
        renderSectionHeader={() => (
          <CategoryList
            categories={categories}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}
        ListHeaderComponent={() => (
          <CryptoHeader symbol={data?.symbol} logo={data?.logo} />
        )}
        renderItem={({ item }) => (
          <>
          <View style={[defaultStyles.block, { height: 500 }]}>
            {tickers && (
              <>
                {!isActive && (
                  <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.dark }}>
                      {tickers[tickers.length - 1].price.toFixed(2)} €
                    </Text>
                    <Text style={{ fontSize: 18, color: Colors.gray }}>Today</Text>
                  </View>
                )}
                {isActive && (
                  <View>
                    <AnimatedTextInput
                      editable={false}
                      underlineColorAndroid={'transparent'}
                      style={{ fontSize: 30, fontWeight: 'bold', color: Colors.dark }}
                      animatedProps={animatedText}></AnimatedTextInput>
                    <AnimatedTextInput
                      editable={false}
                      underlineColorAndroid={'transparent'}
                      style={{ fontSize: 18, color: Colors.gray }}
                      animatedProps={animatedDateText}></AnimatedTextInput>
                  </View>
                )}
                <CartesianChart
                  chartPressState={state}
                  axisOptions={{
                    font,
                    tickCount: 5,
                    labelOffset: { x: -2, y: 0 },
                    labelColor: Colors.gray,
                    formatYLabel: (v) => `${v} €`,
                    formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
                  }}
                  data={tickers!}
                  xKey="timestamp"
                  yKeys={['price']}>
                  {({ points }) => (
                    <>
                      <Line points={points.price} color={Colors.primary} strokeWidth={3} />
                      {isActive && <ToolTip x={state.x.position} y={state.y.price.position} />}
                    </>
                  )}
                </CartesianChart>
              </>
            )}
          </View>
          <CryptoOverview />
        </>
        )}
      >
      </SectionList>
    </>
  )
}




const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default Page