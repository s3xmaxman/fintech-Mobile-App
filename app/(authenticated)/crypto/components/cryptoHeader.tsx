import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

interface CryptoHeaderProps {
    symbol: string;
    logo?: string;
}

const CryptoHeader = ({ symbol, logo }:CryptoHeaderProps) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
        }}
      >
        <Text style={styles.subtitle}>{symbol}</Text>
        {logo && (
          <Image source={{ uri: logo }} style={{ width: 60, height: 60 }} />
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
          ]}
        >
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
          <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>
            Receive
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CryptoHeader;


const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
});