import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';


// MMKVを使ってユーザーの非アクティビティ情報を保存するストレージを作成
const storage = new MMKV({
    id: 'user-inactivity-storage',
});

// ユーザーの非アクティビティを監視するカスタムフック
export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // AppStateの変化を監視するeffectを設定
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  })

  // AppStateの変化を処理するハンドラ関数
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    // 'background'状態になった時に現在時刻を保存
    if(nextAppState === "background") {
        recordStartTime();
    } 
    // 'active'状態に戻った時に、前回の'background'状態からの経過時間を計算
    else if(nextAppState === 'active' && appState.current.match(/background/)) {
        const elapsed = Date.now() - (storage.getNumber('start_time') || 0);

        // 経過時間が30秒を超えており、かつユーザーがサインインしている場合はロック画面に遷移
        if(elapsed > 30000 && isSignedIn) {
            router.replace('/(authenticated)/(modals)/lock');
        }
    }
    appState.current = nextAppState;
  }

  // 'background'状態になった時の現在時刻を保存する関数
  const recordStartTime = () => {
    storage.set('start_time', Date.now());
  }

  return children
}