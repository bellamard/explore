import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground, // Gardé au cas où l'utilisateur voudrait le remettre
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import StylesLogin from '../styles/login';
import Styles, { colors } from '../styles';
const logo = require('../assets/rdc_logo.png');
const bg = require('../assets/bg.jpg');
// Configuration de LayoutAnimation
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Login = () => {
  // Retrait de const bg = require('../assets/bg.jpg');

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState(1);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    };
  }, [step]);

  // --- Fonctions inchangées ---
  const handleSendOtp = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Erreur', 'Le code OTP doit comporter 6 chiffres.');
      return;
    }
    Alert.alert('Succès', 'Connexion réussie !');
  };

  const handleResendOtp = () => {
    Alert.alert('Info', 'Un nouveau code OTP a été envoyé.');
  };

  const handleEmailChange = text => {
    console.log('Nouveau texte:', text);
    setEmail(text);
  };
  // ----------------------------

  const AnimatedView = ({ children }) => (
    <Animated.View
      style={[
        // Utilisation des styles mis à jour
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {children}
    </Animated.View>
  );

  const renderEmailInput = () => (
    <AnimatedView>
      <View style={StylesLogin.animatedContent}>
        <Text style={StylesLogin.label}>Adresse E-mail</Text>
        <View style={StylesLogin.inputContainer}>
          <Icon name="envelope-o" size={20} style={StylesLogin.icon} />
          <TextInput
            style={StylesLogin.input}
            placeholder="utilisateur@domaine.com"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        <TouchableOpacity
          style={StylesLogin.buttonContainer}
          onPress={handleSendOtp}
        >
          <Text style={StylesLogin.buttonText}>Envoyer le Code OTP</Text>
        </TouchableOpacity>

        {renderSocialLogin()}
      </View>
    </AnimatedView>
  );

  const renderOtpInput = () => (
    <AnimatedView>
      <View style={StylesLogin.animatedContent}>
        <Text style={StylesLogin.label}>Code de Vérification</Text>
        <Text style={StylesLogin.infoText}>Code envoyé à **{email}**.</Text>

        <View style={StylesLogin.otpInputContainer}>
          <TextInput
            style={StylesLogin.otpInput}
            placeholder="••••••"
            keyboardType="number-pad"
            maxLength={6}
            value={otpCode}
            onChangeText={setOtpCode}
          />
        </View>

        <TouchableOpacity
          style={StylesLogin.buttonContainer}
          onPress={handleVerifyOtp}
        >
          <Text style={StylesLogin.buttonText}>Vérifier et Se Connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setStep(1)}
          style={StylesLogin.backButton}
        >
          <Text style={StylesLogin.backButtonText}>← Modifier l'E-mail</Text>
        </TouchableOpacity>

        <View style={StylesLogin.resendContainer}>
          <Text style={StylesLogin.infoText}>Pas de code ?</Text>
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={StylesLogin.resendLink}>Renvoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedView>
  );

  const renderSocialLogin = () => (
    <View>
      <Text style={StylesLogin.dividerText}>OU connexion rapide</Text>
      <View style={StylesLogin.socialIcons}>
        <TouchableOpacity style={StylesLogin.SocialIconBox}>
          <Icon name="facebook" size={20} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={StylesLogin.SocialIconBox}>
          <Icon name="google" size={20} color="#db4437" />
        </TouchableOpacity>
        <TouchableOpacity style={StylesLogin.SocialIconBox}>
          <Icon name="twitter" size={20} color="#1da1f2" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    // Utilisation du container style pour le fond uni/texturé
    <View style={StylesLogin.container}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={[StylesLogin.bgImage]}
      >
        <View>
          <View style={StylesLogin.header}>
            <Image source={logo} style={StylesLogin.logo} />
            <Text style={StylesLogin.title}>Connexion Sécurisée</Text>
            <Text style={StylesLogin.subtitle}>
              {step === 1
                ? 'Accédez à votre compte avec une vérification en deux étapes.'
                : 'Entrez le code pour finaliser la connexion.'}
            </Text>
          </View>

          {/* La carte flottante */}
          <View style={StylesLogin.boxinputWrapper}>
            {step === 1 ? renderEmailInput() : renderOtpInput()}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
