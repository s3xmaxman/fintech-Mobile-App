import { View, Text, SectionList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
const Page = () => {
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()
  const categories = ['Overview', 'News', 'Orders', 'Transactions'];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!id) {
    return <Text>Invalid id</Text>
  }

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
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
            }}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
                <Text
                  style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <Text style={styles.subtitle}>{data?.symbol}</Text>
              {data?.logo && (
                <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
              )}
            </View>

            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
                ]}>
                <Ionicons name="add" size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <Text style={styles.subtitle}>Overview</Text>
            <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central bank or single
                administrator, that can be sent from user to user on the peer-to-peer bitcoin
                network without the need for intermediaries. Transactions are verified by network
                nodes through cryptography and recorded in a public distributed ledger called a
                blockchain.
            </Text>
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