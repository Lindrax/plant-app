
import { StyleSheet, Text, View} from "react-native"
import { useContext } from "react"

import { ThemeContext } from "../../context/ThemeContext"
import getColors from "../../styles/themeColors"

const SettingsScreen = ({navigation}) => {
  const { theme } = useContext(ThemeContext)
  const colors = getColors(theme)
  const styles = getStyles(colors)

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Placeholder</Text>
    </View>
  )
}

const getStyles = (colors) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.font,
      alignSelf: 'center',
      alignItems: 'center',
      fontSize: 20
    }
  })

export default SettingsScreen