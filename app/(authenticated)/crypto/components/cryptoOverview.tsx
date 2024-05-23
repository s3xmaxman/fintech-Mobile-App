// components/CryptoOverview.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';


const CryptoOverview = () => {
  return (
    <View style={[defaultStyles.block, { marginTop: 20 }]}>
      <Text style={styles.subtitle}>Overview</Text>
      <Text style={{ color: Colors.gray }}>
        Bitcoin is a decentralized digital currency, without a central bank or single
        administrator, that can be sent from user to user on the peer-to-peer bitcoin
        network without the need for intermediaries. Transactions are verified by network
        nodes through cryptography and recorded in a public distributed ledger called a
        blockchain.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: '600',
    color: Colors.dark,
  },
});

export default CryptoOverview;