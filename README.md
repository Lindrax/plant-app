# Plant App

## Instructions to Run the App

### Steps to Run the App

1. Clone the repository:
   ```sh
   git clone https://github.com/Lindrax/plant-app.git
   cd plant-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Scan the QR code with the Expo Go app on your mobile device, run it in an emulator or access the web interface in http://localhost:8081

## Architecture and Technical Decisions

### Architecture

The app follows a component-based architecture using React Native with Expo for easy development and deployment. It is structured into several key components:

- **Context API**: Manages global states for plants and themes.
- **Navigation**: Uses `react-navigation` to handle tab and stack-based navigation.
- **Screens**:
  - **List Screen**: Displays a list of stored plants. Opportunity to filter shown plants, and delete them. You can click on the plant to see the detail view.
  - **Scan Screen**: Enables the user to capture and add a new plant.
  - **Settings Screen**: Placeholder.
  - **Profile Screen**: Placeholder
  - **Plant Detail View**: Displays plant details with options for editing name, notes and picture. You can choose a picture from your gallery.
- **Theme Support**: Implements a dark/light theme using AsyncStorage and React context. Allows uniform theme across the whole app and changes are reflected instantly.

### Technical Decisions

- **Expo for development**: Simplifies app setup and camera integration.
- **Context API for state management**: Lightweight and suitable for the app's needs.
- **React Navigation**: Provides a clean and scalable navigation system.
- **AsyncStorage for theme persistence**: Enables user preferences to be saved across sessions.

## Screenshots

### List View

<img src="./documents/image.png" alt="List View" width="250"><img src="./documents/image-1.png" alt="List View Darkmode" width="250">

### Scan View

<img src="./documents/image-2.png" alt="Scan View" width="250"><img src="./documents/image-3.png" alt="Scan View Darkmode" width="250">

### Detail View

<img src="./documents/image-4.png" alt="Detail View (no notes)" width="250"><img src="./documents/image-6.png" alt="Detail View with notes" width="250"><img src="./documents/image-5.png" alt="Edit View" width="250">
