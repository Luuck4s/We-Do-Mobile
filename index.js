/**
 * @format
 */

import {AppRegistry} from 'react-native';
import authRoutes from './src/Navegacao';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => authRoutes);
