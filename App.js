import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationContext from './LocationContext';
import HomeScreenWrapper from './views/HomeScreenWrapper';
import LocationsScreenWrapper from './views/LocationsScreenWrapper';
import ButtonIcon from './components/ButtonIcon';

const Stack = createNativeStackNavigator();

function App() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocationFromStorage = async () => {
            try {
                const storedLocation = await AsyncStorage.getItem(
                    'storedLocation'
                );

                if (storedLocation) {
                    setLocation(`'${storedLocation}'`);
                }
            } catch (error) {
                console.error('Error reading location from storage:', error);
            }
        };

        getLocationFromStorage();
    }, []);

    return (
        <LocationContext.Provider
            value={{ location, setLocation, loading, setLoading }}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreenWrapper}
                        options={{
                            title: 'Lịch cúp điện',
                            headerTransparent: true,
                            headerBlurEffect: 'light',
                            headerTitleStyle: {
                                fontSize: '20px',
                            },
                            headerRight: () => (
                                <ButtonIcon
                                    target="Location"
                                    icon="location"
                                    title=""
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Location"
                        component={LocationsScreenWrapper}
                        options={{
                            title: 'Địa điểm',
                            headerTransparent: true,
                            headerBlurEffect: 'light',
                            headerTitleStyle: {
                                fontSize: '20px',
                            },
                            headerBackTitle: 'Quay lại',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </LocationContext.Provider>
    );
}

export default App;
