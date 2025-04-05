import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import getColors from "../../styles/themeColors";

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = getColors(theme);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          thumbColor={theme === "dark" ? "green" : "gray"}
          trackColor={{ false: "lightgray", true: "darkgray" }}
        />
      </View>

     
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={false} // Placeholder value
          onValueChange={() => alert("Notifications setting coming soon!")}
          thumbColor="gray"
          trackColor={{ false: "lightgray", true: "darkgray" }}
        />
      </View>

 
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
      </View>

  
      <TouchableOpacity
        style={styles.placeholderButton}
        onPress={() => alert("More settings coming soon!")}
      >
        <Text style={styles.placeholderText}>More Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.font,
      marginBottom: 20,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.listItem,
    },
    settingText: {
      fontSize: 18,
      color: colors.font,
    },
    settingValue: {
      fontSize: 16,
      color: colors.date,
    },
    placeholderButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: colors.listItem,
      borderRadius: 10,
      alignItems: "center",
    },
    placeholderText: {
      color: colors.font,
      fontSize: 16,
    },
  });

export default SettingsScreen;