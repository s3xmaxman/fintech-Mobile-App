import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';


// CategoryListコンポーネントに渡すプロパティの型定義
interface CategoryListProps {
  categories: string[]; // カテゴリー名の配列
  activeIndex: number; // アクティブなカテゴリーのインデックス
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>; // activeIndexを更新するための関数
}


// CategoryListコンポーネント
const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setActiveIndex(index)}
          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
        >
          <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
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

export default CategoryList;