import { registerRootComponent } from 'expo';  // Importing registerRootComponent from Expo
import App from './App';  // Import the main App component

// If you have a Navigation setup component, you can register it here instead
// Just use Navigation component if your app is structured this way
import Navigation from './Navigation';  // If you used a separate navigation file

// Register the main component (Navigation) that manages your screens
registerRootComponent(Navigation);
