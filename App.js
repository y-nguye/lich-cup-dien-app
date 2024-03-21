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
    const defaultLocation = 'lap-vo';
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const clearAllStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Tất cả dữ liệu đã được xoá từ AsyncStorage');
        } catch (error) {
            console.error('Lỗi khi xoá tất cả dữ liệu từ AsyncStorage:', error);
        }
    };

    // clearAllStorage();

    useEffect(() => {
        const getLocationFromStorage = async () => {
            try {
                const storedLocation = await AsyncStorage.getItem(
                    'storedLocation'
                );

                console.log(location);

                if (storedLocation && typeof storedLocation === 'string') {
                    setLocation(JSON.parse(storedLocation));
                    setSelectedItem(JSON.parse(storedLocation));
                } else {
                    setLocation(defaultLocation);
                    setSelectedItem(defaultLocation);
                }
            } catch (error) {
                console.error('Error reading location from storage:', error);
            }
        };

        getLocationFromStorage();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                selectedItem,
                setSelectedItem,
                loading,
                setLoading,
                defaultLocation,
            }}
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
                                fontSize: 20, // Sử dụng pixel hoặc rem thay vì px
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
                                fontSize: 20, // Sử dụng pixel hoặc rem thay vì px
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
