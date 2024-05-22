import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import Dropdown from '@/components/Dropdown';

const Page = () => {
  const balance = 1420;

  const onAddMoney = () => {
    
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'add money'} onPress={onAddMoney}/>
        <RoundBtn icon={'refresh'} text={'Exchange'} />
        <RoundBtn icon={'list'} text={'Details'} />
        <Dropdown />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  account: {
     margin: 80,
     alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    fontSize: 50,
    fontWeight: '500',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Page