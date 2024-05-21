
import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useAssets } from 'expo-asset';

const index = () => {
    const [assets] = useAssets([require('../assets/videos/intro.mp4')]);
    

  if (!assets) {
    return null
  }

  return (
    <View style={styles.container}>
      <Video
        resizeMode={ResizeMode.COVER}
        isMuted
        isLooping={true}
        shouldPlay={true}
        source={{ uri: assets[0].uri }}
        style={styles.video}
        onError={(error) => console.error('Video error:', error)} 
      />
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    video: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    header: {
      fontSize: 36,
      fontWeight: '900',
      textTransform: 'uppercase',
      color: 'white',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 60,
      paddingHorizontal: 20,
    },
  });
export default index