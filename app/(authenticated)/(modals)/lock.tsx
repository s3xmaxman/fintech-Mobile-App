import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
  
const Page = () => {
  const { user } = useUser(); // ユーザー情報を取得
  const [firstName, setFirstName] = useState(user?.firstName); // ユーザーのファーストネームを状態として保持
  const [code, setCode] = useState<number[]>([]); // 入力されたパスコードを状態として保持
  const codeLength = Array(6).fill(0); // パスコード入力欄のプレースホルダー用配列
  const router = useRouter(); // ルーティング用
  
  // アニメーション関連
  const offset = useSharedValue(0); // パスコード入力欄のオフセットを制御するアニメーション値
  
  // アニメーションスタイル
  const style = useAnimatedStyle(() => {
    return {
        transform: [{ translateX: offset.value }],
    };
  });
  
  // アニメーション定数
  const OFFSET = 20; // パスコード入力欄のオフセット量
  const TIME = 80; // アニメーション時間
  
    // パスコード入力完了時の処理
  useEffect(() => {
    if (code.length === 6) {
        // 正しいパスコードの場合
        if (code.join('') === '111111') {
          router.replace('/(authenticated)/(tabs)/home'); // ホーム画面に遷移
          setCode([]); // パスコード入力欄をリセット
        } else {
          // 間違ったパスコードの場合
          // パスコード入力欄を振動させるアニメーション
          offset.value = withSequence(
            withTiming(-OFFSET, { duration: TIME / 2 }), // 左にOFFSET移動
            withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true), // 右にOFFSET移動を4回繰り返す
            withTiming(0, { duration: TIME / 2 }) // 元の位置に戻る
          );
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // エラーのハプティックフィードバック
          setCode([]); // パスコード入力欄をリセット
        }
    }
  }, [code]);
  
    // 数字ボタン押下時の処理
  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // 軽いハプティックフィードバック
    setCode([...code, number]); // 入力された数字をパスコードに追加
  };
  
    // バックスペースボタン押下時の処理
  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // 軽いハプティックフィードバック
    setCode(code.slice(0, -1)); // 最後の数字を削除
  };
  
    // 生体認証ボタン押下時の処理
  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync(); // 生体認証を実行
    if (success) {
        router.replace('/(authenticated)/(tabs)/home'); // 認証成功したらホーム画面に遷移
    } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // 認証失敗したらエラーのハプティックフィードバック
    }
  };
  
  return (
      <SafeAreaView>
        {/* ユーザーへの挨拶 */}
        <Text style={styles.greeting}>Welcome back, {firstName}</Text>
  
        {/* パスコード入力欄 */}
        <Animated.View style={[styles.codeView, style]}>
          {codeLength.map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeEmpty,
                {
                  backgroundColor: code[index] ? Colors.primary : Colors.lightGray, // 入力があれば色を変える
                },
              ]}
            />
          ))}
        </Animated.View>
  
        {/* 数字ボタンと生体認証ボタン */}
        <View style={styles.numbersView}>
          {/* 1〜3の数字ボタン */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {[1, 2, 3].map((number) => (
              <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* 4〜6の数字ボタン */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {[4, 5, 6].map((number) => (
              <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* 7〜9の数字ボタン */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {[7, 8, 9].map((number) => (
              <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* 生体認証、0、バックスペースボタン */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 生体認証ボタン */}
            <TouchableOpacity onPress={onBiometricAuthPress}>
              <MaterialCommunityIcons name="face-recognition" size={26} color="black" />
            </TouchableOpacity>
  
            {/* 0の数字ボタン */}
            <TouchableOpacity onPress={() => onNumberPress(0)}>
              <Text style={styles.number}>0</Text>
            </TouchableOpacity>
  
            {/* バックスペースボタン */}
            <View style={{ minWidth: 30 }}>
              {code.length > 0 && (
                <TouchableOpacity onPress={numberBackspace}>
                  <Text style={styles.number}>
                    <MaterialCommunityIcons name="backspace-outline" size={26} color="black" />
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* パスコードを忘れた場合のテキスト */}
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.primary,
              fontWeight: '500',
              fontSize: 18,
            }}>
            Forgot your passcode?
          </Text>
        </View>
      </SafeAreaView>
    );
};
  


const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
});
export default Page;