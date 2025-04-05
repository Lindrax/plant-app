import { StyleSheet, Text, View, Image } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { PlantContext } from "../../context/PlantContext";
import getColors from "../../styles/themeColors";

const ProfileScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { plants } = useContext(PlantContext);

  const colors = getColors(theme);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{
          uri: "https://placehold.co/600x400?text=Placeholder", // Placeholder profile picture
        }}
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.name}>Axel</Text>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Total Plants: {plants.length}</Text>
        <Text style={styles.statText}>Favorite Plant: Aloe Vera</Text>
        <Text style={styles.statText}>Member Since: 2025</Text>
      </View>

      <Text style={styles.placeholderText}>More profile details coming soon!</Text>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.font,
      marginBottom: 20,
    },
    statsContainer: {
      marginBottom: 20,
      alignItems: "center",
    },
    statText: {
      fontSize: 18,
      color: colors.font,
      marginBottom: 10,
    },
    placeholderText: {
      fontSize: 16,
      color: colors.font,
      marginTop: 20,
    },
  });

export default ProfileScreen;