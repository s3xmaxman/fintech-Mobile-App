import { create } from 'zustand'; 
import { zustandStorage } from '@/store/mmkv-storage'; 
import { createJSONStorage, persist } from 'zustand/middleware'; 

// 取引データのインターフェースを定義
export interface Transaction {
  id: string; // 取引ID
  title: string; // 取引名
  amount: number; // 取引金額
  date: Date; // 取引日時
}

// 残高状態のインターフェースを定義
export interface BalanceState {
  transactions: Array<Transaction>; // 取引履歴の配列
  runTransaction: (transaction: Transaction) => void; // 新しい取引を実行する関数
  balance: () => number; // 現在の残高を計算する関数
  clearTransactions: () => void; // 取引履歴をクリアする関数
}

// 残高状態を管理するZustandストアを作成
export const useBalanceStore = create<BalanceState>()(
  persist( // persistミドルウェアで状態を永続化する
    (set, get) => ({ // Zustandストアの初期状態とアクションを定義
      transactions: [], // 初期状態では取引履歴は空
      runTransaction: (transaction: Transaction) => { 
        // 新しい取引を実行する関数
        set((state) => ({ 
          // Zustandのsetter関数を使って状態を更新
          transactions: [...state.transactions, transaction] 
          // 既存の取引履歴に新しい取引を追加
        }));
      },
      balance: () => 
        // 現在の残高を計算する関数
        get().transactions.reduce((acc, transaction) => acc + transaction.amount, 0), 
        // reduce関数を使って取引金額を合計
      clearTransactions: () => {
        // 取引履歴をクリアする関数
        set({ transactions: [] }); // transactionsを空の配列に設定
      },
    }),
    {
      name: 'balance', // 永続化する際のキー名
      storage: createJSONStorage(() => zustandStorage), 
      // JSON形式でデータを保存し、MMKVをストレージとして使用する
    }
  )
);