import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

import { loginStyles as styles } from '@/styles/loginStyles';

export default function LoginScreen() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin() {
    try {
      setMessage('');

      await login({
        username,
        password,
      });

      router.replace('/(tabs)/circles');
    } catch (error) {
      setMessage('Invalid username or password');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.logoBubble}>
            <Text style={styles.logoText}>✨</Text>
          </View>

          <Text style={styles.title}>Timeline</Text>

          <Text style={styles.subtitle}>
            Capture life. Together.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>USERNAME</Text>

          <TextInput
            placeholder="philchaplin"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>PASSWORD</Text>

          <TextInput
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => router.push('/register')}
            activeOpacity={0.8}
          >
            <Text style={styles.switchText}>
              New here?{' '}
              <Text style={styles.switchTextStrong}>
                Create an account
              </Text>
            </Text>
          </TouchableOpacity>

          {message ? (
            <Text style={styles.message}>{message}</Text>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}