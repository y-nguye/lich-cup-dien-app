import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationContext from '../LocationContext';

import {
    GestureHandlerRootView,
    TouchableOpacity,
} from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
function PickerComponent() {
    const { setLocation, setLoading } = useContext(LocationContext);
    const [data, setData] = useState([]);
    const [storedLocation, setStoredLocation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = require('../locations.json');
                setData(jsonData.data);

                // Lấy dữ liệu đã lưu từ AsyncStorage
                const storedStoredLocation = await AsyncStorage.getItem(
                    'storedLocation'
                );
                if (storedStoredLocation) {
                    setStoredLocation(JSON.parse(storedStoredLocation));
                }
            } catch (error) {
                console.error('Error reading JSON file:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Lưu trạng thái mới của storedLocation vào AsyncStorage khi storedLocation thay đổi
        AsyncStorage.setItem('storedLocation', JSON.stringify(storedLocation));
    }, [storedLocation]);

    const toggleItem = (item) => {
        if (storedLocation !== item.value) {
            setStoredLocation(item.value); // Chọn mục mới
            setLocation(item.value);
            setLoading(true);
        } else {
            setLocation(item.value);
        }
    };

    return (
        <View className="m-5 rounded-xl overflow-hidden bg-white">
            <GestureHandlerRootView>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleItem(item)}
                        style={[
                            styles.itemContainer,
                            storedLocation === item.value &&
                                styles.storedLocation,
                        ]}
                    >
                        <View className="flex flex-row justify-between items-center">
                            <Text style={styles.itemText}>{item.label}</Text>
                            <Text
                                style={[
                                    storedLocation === item.value
                                        ? styles.tickVisible
                                        : styles.tickHidden,
                                ]}
                            >
                                <Feather name="check" size={24} color="black" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    storedLocation: {
        backgroundColor: 'silver',
        borderBottomWidth: 1,
    },

    tickHidden: {
        display: 'none',
    },
    tickVisible: {
        display: 'block',
    },
});

export default PickerComponent;
