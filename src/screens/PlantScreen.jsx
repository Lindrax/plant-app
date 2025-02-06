import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import { ThemeContext } from '../context/ThemeContext';
import getColors from '../styles/themeColors';
import { PlantContext } from '../context/PlantContext';

const PlantScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { plants, setPlants } = useContext(PlantContext);
  const { plant } = route.params;

  const [name, setName] = useState(plant.name);
  const [notes, setNotes] = useState(plant.notes || '');
  const [image, setImage] = useState(plant.image)
  const [editing, setEditing] = useState(false)

  const colors = getColors(theme)
  const styles = getStyles(colors);
  
const changeImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setImage(result.assets[0].uri);
  }
};

const editPlant = () => {
  const updatedPlants = plants.map((p) => 
    p.name === plant.name ? { ...p, name: name , notes: notes  , image: image   } : p
  );

  setPlants(updatedPlants)
  navigation.replace('PlantView', { plant: { ...plant, name: name, notes: notes, image: image } });
  setNotes('')
  setName('')
  setEditing(false);
};

  return (
    <View style={styles.container}>
      { editing ? (
        <View>
          <TouchableOpacity onPress={changeImage} style={styles.imagePicker}>
            <Image source={{ uri: image  }} style={styles.image} />
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
          <Text style={{color: colors.font}} > Edit name: <TextInput           
            style={styles.input}
            placeholder= {name}
            value={name}
            onChangeText={setName}
          />
          </Text>
          <Text style={{color: colors.font}}> Edit notes: <TextInput           
            style={styles.input}
            placeholder= {notes}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
          </Text>

          <TouchableOpacity style={styles.editButton} onPress={ editPlant}>
            <Text style={{color: colors.font}}>Save changes</Text>
          </TouchableOpacity>
        </View>)
        : (
        <View>
          <Image source={{ uri: plant.image }} style={styles.image} />
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.date}>Added: {plant.date}</Text>
          <Text style={styles.notes}>
            {plant.notes ? plant.notes : '🌱 No additional notes provided.'}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Ionicons name='create' size={35} color={ colors.font} />
          </TouchableOpacity>
        </View>
        )
      }
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: colors.font,
    borderColor: colors.font,
  },
  editButton: { 
    alignSelf: 'center', 
    borderRadius: 40, 
    backgroundColor: colors.backgroundColor, 
    padding: 10
  },
  image: {
    alignSelf:'center',
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.font,
  },
  date: {
    fontSize: 16,
    color: colors.date,
  },
  notes: {
    marginTop: 10,
    fontSize: 16,
    color: colors.font,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changeImageText: {
    marginTop: 10,
    color: colors.font,
  },
});


export default PlantScreen;
