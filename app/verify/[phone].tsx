import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const page = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string}>();
  const [code, setCode] = useState('');
  const { signIn } = useSignIn();

  useEffect(() => {
    if(code.length === 6) {
        if(signin === 'true') {
            verifySignIn();
        } else {
            verifyCode();
        }
    }
  }, [code])

  const verifyCode = async () => {
      
  }

  const verifySignIn = async () => {
      
  }
  return (
    <View>
      <Text>[phone]</Text>
    </View>
  )
}

export default page

const styles = StyleSheet.create({})