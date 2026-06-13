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

export default function RegisterScreen() {
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  async function handleRegister() {
    try {
      setMessage('');

      await register({
        username,
        email,
        password,
      });

      router.replace('/create-circle');
    } catch (error) {
      setMessage('Could not create account');
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
            <Text style={styles.logoText}>💜</Text>
          </View>

          <Text style={styles.title}>Start your timeline</Text>

          <Text style={styles.subtitle}>
            Create a private space for the people, places, and memories
            you want to keep.
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

          <Text style={styles.label}>EMAIL</Text>

          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.switchText}>
              Already have an account?{' '}
              <Text style={styles.switchTextStrong}>Log in</Text>
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