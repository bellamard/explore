import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  BackHandler,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylesLogin from '../styles/login';
import Styles, { colors } from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import OTPInput from '../components/OTPInput';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);
  const [emailError, setEmailError] = useState('');

  const bg = require('../assets/bg.jpg');

  // Références
  const emailInputRef = useRef();
  const otpInputRefs = useRef([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardScale = useRef(new Animated.Value(0.95)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Animated.Easing.out(Animated.Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Timer pour le renvoi d'OTP
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendOTP = () => {
    if (!email) {
      setEmailError('Veuillez entrer votre email');
      Vibration.vibrate(50);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Email invalide');
      Vibration.vibrate(50);
      return;
    }

    setEmailError('');
    setIsLoading(true);

    // Simulation d'envoi d'OTP
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      setTimer(60); // 60 secondes
      Vibration.vibrate(100);

      // Focus sur le premier champ OTP
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 300);

      Alert.alert(
        'OTP Envoyé',
        `Un code à 6 chiffres a été envoyé à ${email}`,
        [{ text: 'OK' }],
      );
    }, 1500);
  };

  const handleResendOTP = () => {
    if (timer > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimer(60);
      Vibration.vibrate(100);
      Alert.alert('Code renvoyé', 'Un nouveau code a été envoyé à votre email');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      Alert.alert('Erreur', 'Veuillez entrer le code complet à 6 chiffres');
      Vibration.vibrate(50);
      return;
    }

    setIsLoading(true);

    // Simulation de vérification
    setTimeout(() => {
      setIsLoading(false);

      // Animation de succès
      Animated.sequence([
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500),
      ]).start(() => {
        // Navigation vers l'écran principal
        navigation.replace('Home');
      });

      Alert.alert('Succès', 'Connexion réussie!');
    }, 1500);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      // Si collé, prendre seulement les 6 premiers caractères
      const otpArray = value.slice(0, 6).split('');
      const newOtp = [...otp];
      otpArray.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);

      // Focus sur le dernier champ rempli
      const lastIndex = Math.min(index + otpArray.length, 5);
      otpInputRefs.current[lastIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const formatTimer = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const goBackToEmail = () => {
    setIsEmailSent(false);
    setOtp(['', '', '', '', '', '']);
    setFocusedInput('email');
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={bg}
        style={Styles.bgImage}
        resizeMode="cover"
        blurRadius={Platform.OS === 'ios' ? 0 : 2}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.4)']}
          style={StylesLogin.gradientOverlay}
        />

        <BlurView
          blurType="dark"
          blurAmount={Platform.OS === 'ios' ? 10 : 5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.9)"
          style={StylesLogin.blurContainer}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={StylesLogin.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            <ScrollView
              contentContainerStyle={StylesLogin.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Animated.View
                style={[
                  StylesLogin.content,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: cardScale },
                    ],
                  },
                ]}
              >
                {/* Header avec animation de succès */}
                <View style={StylesLogin.header}>
                  <Animated.View
                    style={[
                      StylesLogin.logoContainer,
                      {
                        transform: [
                          {
                            scale: successAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.2],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={
                        isEmailSent
                          ? ['#00B09B', '#96C93D']
                          : ['#6A11CB', '#2575FC']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StylesLogin.logoGradient}
                    >
                      <Icon
                        name={isEmailSent ? 'email-check' : 'email-lock'}
                        size={42}
                        color="#FFF"
                      />
                    </LinearGradient>
                  </Animated.View>

                  <Text style={StylesLogin.welcomeText}>
                    {isEmailSent ? 'Vérifiez votre email' : 'Bienvenue'}
                  </Text>

                  <Text style={StylesLogin.subtitle}>
                    {isEmailSent
                      ? `Entrez le code envoyé à\n${email}`
                      : 'Connectez-vous avec votre email'}
                  </Text>
                </View>

                {/* Carte principale */}
                <View style={StylesLogin.card}>
                  {/* Bouton retour vers email */}
                  {isEmailSent && (
                    <TouchableOpacity
                      style={StylesLogin.backButton}
                      onPress={goBackToEmail}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name="arrow-left"
                        size={20}
                        color={colors.primary}
                      />
                      <Text style={StylesLogin.backButtonText}>
                        Modifier l'email
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* Formulaire Email */}
                  {!isEmailSent ? (
                    <View style={StylesLogin.formContainer}>
                      <View style={StylesLogin.inputGroup}>
                        <Text style={StylesLogin.inputLabel}>
                          Adresse email
                        </Text>
                        <View
                          style={[
                            StylesLogin.inputWrapper,
                            focusedInput === 'email' &&
                              StylesLogin.inputFocused,
                            emailError && StylesLogin.inputError,
                          ]}
                        >
                          <Icon
                            name="email-outline"
                            size={24}
                            color={
                              focusedInput === 'email' ? colors.primary : '#999'
                            }
                            style={StylesLogin.inputIcon}
                          />
                          <TextInput
                            ref={emailInputRef}
                            style={StylesLogin.input}
                            placeholder="exemple@email.com"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={text => {
                              setEmail(text);
                              setEmailError('');
                            }}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="send"
                            onSubmitEditing={handleSendOTP}
                          />
                          {email.length > 0 && (
                            <TouchableOpacity
                              onPress={() => {
                                setEmail('');
                                setEmailError('');
                              }}
                              hitSlop={{
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10,
                              }}
                            >
                              <Icon
                                name="close-circle"
                                size={20}
                                color="#999"
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                        {emailError ? (
                          <Text style={StylesLogin.errorText}>
                            {emailError}
                          </Text>
                        ) : (
                          <Text style={StylesLogin.hintText}>
                            Nous enverrons un code de vérification
                          </Text>
                        )}
                      </View>

                      {/* Bouton Envoyer OTP */}
                      <TouchableOpacity
                        style={[
                          StylesLogin.primaryButton,
                          isLoading && StylesLogin.buttonDisabled,
                        ]}
                        onPress={handleSendOTP}
                        disabled={isLoading || !email}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#6A11CB', '#2575FC']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={StylesLogin.buttonGradient}
                        >
                          {isLoading ? (
                            <View style={StylesLogin.loadingContainer}>
                              <Animated.View
                                style={StylesLogin.loadingSpinner}
                              />
                              <Text style={StylesLogin.primaryButtonText}>
                                Envoi en cours...
                              </Text>
                            </View>
                          ) : (
                            <>
                              <Icon
                                name="send"
                                size={22}
                                color="#FFF"
                                style={StylesLogin.buttonIcon}
                              />
                              <Text style={StylesLogin.primaryButtonText}>
                                Envoyer le code
                              </Text>
                            </>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Alternative rapide */}
                      <View style={StylesLogin.quickLogin}>
                        <View style={StylesLogin.separator}>
                          <View style={StylesLogin.separatorLine} />
                          <Text style={StylesLogin.separatorText}>
                            Connexion rapide
                          </Text>
                          <View style={StylesLogin.separatorLine} />
                        </View>

                        <View style={StylesLogin.socialButtons}>
                          <TouchableOpacity
                            style={StylesLogin.socialButton}
                            onPress={() =>
                              Alert.alert('Google', 'Connexion Google')
                            }
                          >
                            <Icon name="google" size={24} color="#DB4437" />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={StylesLogin.socialButton}
                            onPress={() =>
                              Alert.alert('Apple', 'Connexion Apple')
                            }
                          >
                            <Icon name="apple" size={24} color="#000" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ) : (
                    /* Formulaire OTP */
                    <View style={StylesLogin.otpContainer}>
                      <Text style={StylesLogin.otpTitle}>
                        Code à 6 chiffres
                      </Text>

                      {/* Input OTP */}
                      <View style={StylesLogin.otpInputs}>
                        {[0, 1, 2, 3, 4, 5].map(index => (
                          <TextInput
                            key={index}
                            ref={ref => (otpInputRefs.current[index] = ref)}
                            style={[
                              StylesLogin.otpInput,
                              otp[index] && StylesLogin.otpInputFilled,
                              focusedInput === `otp${index}` &&
                                StylesLogin.otpInputFocused,
                            ]}
                            value={otp[index]}
                            onChangeText={value =>
                              handleOTPChange(index, value)
                            }
                            onKeyPress={({ nativeEvent }) =>
                              handleKeyPress(index, nativeEvent.key)
                            }
                            onFocus={() => setFocusedInput(`otp${index}`)}
                            onBlur={() => setFocusedInput(null)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                            autoFocus={index === 0}
                          />
                        ))}
                      </View>

                      {/* Timer et Renvoyer */}
                      <View style={StylesLogin.timerContainer}>
                        {timer > 0 ? (
                          <Text style={StylesLogin.timerText}>
                            Renvoyer le code dans {formatTimer(timer)}
                          </Text>
                        ) : (
                          <TouchableOpacity
                            onPress={handleResendOTP}
                            disabled={isLoading}
                            activeOpacity={0.6}
                          >
                            <Text style={StylesLogin.resendText}>
                              Renvoyer le code
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Bouton Vérifier */}
                      <TouchableOpacity
                        style={[
                          StylesLogin.verifyButton,
                          isLoading && StylesLogin.buttonDisabled,
                        ]}
                        onPress={handleVerifyOTP}
                        disabled={isLoading || otp.join('').length !== 6}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#00B09B', '#96C93D']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={StylesLogin.buttonGradient}
                        >
                          {isLoading ? (
                            <View style={StylesLogin.loadingContainer}>
                              <Animated.View
                                style={StylesLogin.loadingSpinner}
                              />
                              <Text style={StylesLogin.verifyButtonText}>
                                Vérification...
                              </Text>
                            </View>
                          ) : (
                            <>
                              <Icon
                                name="check-circle"
                                size={22}
                                color="#FFF"
                                style={StylesLogin.buttonIcon}
                              />
                              <Text style={StylesLogin.verifyButtonText}>
                                Vérifier le code
                              </Text>
                            </>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Footer */}
                  <View style={StylesLogin.footer}>
                    <Text style={StylesLogin.footerText}>
                      En continuant, vous acceptez nos{' '}
                    </Text>
                    <TouchableOpacity>
                      <Text style={StylesLogin.footerLink}>
                        Conditions d'utilisation
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </BlurView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
