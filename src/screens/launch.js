import React,{useEffect, useCallback,useState} from 'react';
import { Text, View, Image,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import logo from '../assets/rdc_logo.png';
import storage from '../services/storage';




const Launch =()=> {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const bg=require('../assets/bg.png');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const init = useCallback(async () => {
    try {

      await new Promise(resolve => setTimeout(resolve, 20000)); 
    } catch (error) {
      console.warn(error);
    } finally {
      navigation.navigate('Home');
    }
  }, [navigation]);

  useEffect(() => {
    init();
  }, [init]);
  return (
    <View
      style={[
        Styles.container
      ]}
    ><ImageBackground source={bg} resizeMode="cover" style={Styles.bgImage}>
      
      <View>
        <Image
          source={logo}
          style={Styles.logo}/>
        <Text style={Styles.title}>Explore RDC</Text>
      </View>
      </ImageBackground>
    </View>
  );
}

export default Launch;
