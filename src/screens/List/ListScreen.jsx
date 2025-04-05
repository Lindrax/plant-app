import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlantContext } from '../../context/PlantContext';
import { ThemeContext } from '../../context/ThemeContext';
import getColors from '../../styles/themeColors';

const ListScreen = ({ navigation }) => {
  const { plants, setPlants } = useContext(PlantContext);
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const colors = getColors(theme);
  const styles = getStyles(colors);

  const queryedPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const deletePlant = (plantToDelete) => {
    if (confirm('Do you want to delete this plant')) {
      const updatedPlants = plants.filter((plant) => plant.name !== plantToDelete);
      setPlants(updatedPlants);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search plants..."
        placeholderTextColor={colors.font}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={queryedPlants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PlantView', { plant: item })}
          >
            <View style={styles.listItem}>
              <Image source={{ uri: item.image }} style={styles.plantImage} />
              <View style={styles.textContainer}>
                <Text style={styles.plantName}>{item.name}</Text>
                <Text style={styles.dateAdded}>Added on: {item.date}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePlant(item.name)}
                >
                  <Ionicons name="trash" size={20} color={colors.font} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ScanView')}
      >
        <Ionicons name="camera" size={32} color={colors.font} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchInput: {
      height: 40,
      borderColor: colors.font,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      margin: 20,
      color: colors.font,
      fontSize: 16,
    },
    listContent: {
      paddingBottom: 80, // Add padding to avoid overlapping with the floating button
    },
    listItem: {
      flexDirection: 'row',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.listItem,
      backgroundColor: colors.listItem,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    plantName: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 2,
      paddingLeft: 10,
      color: colors.font,
    },
    dateAdded: {
      fontSize: 14,
      color: colors.date,
      paddingLeft: 10,
      paddingTop: 5,
    },
    addButton: {
      position: 'absolute',
      bottom: 10,
      right:20,
      backgroundColor: colors.accent, // Use a contrasting color for visibility
      borderRadius: 40,
      padding: 15,
      elevation: 5, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      marginLeft: 4,
      backgroundColor: colors.listItem,
      borderRadius: 40,
      padding: 5,
    },
    plantImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
  });

export default ListScreen;
