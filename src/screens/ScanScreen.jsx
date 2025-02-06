import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useContext } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { PlantContext } from '../context/PlantContext';
import { ThemeContext } from '../context/ThemeContext';
import getColors from '../styles/themeColors';

const ScanScreen =({navigation}) => {
  const { addPlant } = useContext(PlantContext);
  const { theme } = useContext(ThemeContext)

  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const cameraRef = useRef(null);
  
  const colors = getColors(theme)
  const styles = getStyles(colors)

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button style={{padding: 10}} onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const imageData = await cameraRef.current.takePictureAsync();
      setImage(imageData.uri);
    }
  };

 const savePlant = () => {
    if (!name) return alert('Please enter a plant name');
    const newPlant = { name, notes, date: new Date().toDateString(), image };
    addPlant(newPlant);
    setImage(null)
    setName('')
    setNotes('')
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={100}>
     
    <View style={styles.container}>
      
      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter notes"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
          <View style={styles.buttonRow}>
            <Button title="Retake" onPress={() => setImage(null)} />
            <Button title="Save" onPress={savePlant} />
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name='camera' size={32} color={ 'black'} />
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
    
    </KeyboardAvoidingView>
  )}

  const getStyles =(colors) => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
      color: colors.font
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    captureButton: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 50,
      marginBottom: 20,
    },
    captureText: {
      fontSize: 24,
    },
    previewContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    preview: {
      flex: 1,
      width: '100%',
      height: 'flex',
      borderRadius: 10,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      color: colors.font,
      borderColor: colors.font
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.background,
      width: '100%',
      borderBlockColor: colors.font,
    },
  });

export default ScanScreen