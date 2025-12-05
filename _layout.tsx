import { Tabs } from 'expo-router';
import React, { useState } from 'react';

export default function SignInScreen({ onBack }: any) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    if (isRegistering) {
      console.log('Register:', { firstName, lastName, email, password });
    } else {
      console.log('Login:', { email, password });
    }
  };


  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };


  let titleText = 'Welcome Back';
  let subtitleText = 'Login to continue your adventure';
  let buttonText = 'Login';
  let switchText = "Don't have an account? Register";

  if (isRegistering) {
    titleText = 'Create Account';
    subtitleText = 'Join the gamers paradise!';
    buttonText = 'Register';
    switchText = 'Already have an account? Login';
  }


  return (
    <Tabs>
      <Tabs.Screen 
      name="index" 
      options={{ 
        title: 'Home',
        headerShown: false,
       }} 
      />
      
     <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: true,  
        }}
      />

      <Tabs.Screen 
      name="signIn" 
      options={{ 
        href: null,
        title: 'signIn',
        headerShown: false, 
        }} />

    <Tabs.Screen
  name="cart"
  options={{
    title: "Cart",
    headerShown: false,
  }}
/>

    </Tabs>
  );
}