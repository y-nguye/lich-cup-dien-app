import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationContext from '../LocationContext';
import { Feather } from '@expo/vector-icons';

function PickerComponent() {
    const {
        setLocation,
        setLoading,
        selectedItem,
        setSelectedItem,
        defaultLocation,
    } = useContext(LocationContext);
    const [data, setData] = useState([]);
    const [storedLocation, setStoredLocation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = require('../locations.json');
                setData(jsonData.dongthap);

                const storedStoredLocation = await AsyncStorage.getItem(
                    'storedLocation'
                );
                if (storedStoredLocation) {
                    setStoredLocation(JSON.parse(storedStoredLocation));
                    setSelectedItem(JSON.parse(storedStoredLocation));
                } else {
                    setStoredLocation(defaultLocation);
                    setSelectedItem(defaultLocation);
                }
                console.log(storedStoredLocation);
            } catch (error) {
                console.error('Error reading JSON file:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('storedLocation', JSON.stringify(storedLocation));
    }, [storedLocation]);

    const toggleItem = (item) => {
        if (storedLocation !== item.value) {
            setStoredLocation(item.value); // Chọn mục mới
            setLocation(item.value);
            setLoading(true);
            setSelectedItem(item.value); // Cập nhật mục đã chọn
        } else {
            setLocation(item.value);
            setSelectedItem(item.value); // Cập nhật mục đã chọn
        }
    };

    return (
        <View className="m-5 rounded-xl overflow-hidden bg-white">
            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleItem(item)}
                    style={[
                        styles.itemContainer,
                        storedLocation === item.value && styles.storedLocation,
                    ]}
                >
                    <View className="flex flex-row justify-between items-center">
                        <Text style={styles.itemText}>{item.label}</Text>
                        {selectedItem === item.value && (
                            <Feather name="check" size={24} color="black" />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
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
        lineHeight: 24,
    },
    storedLocation: {
        backgroundColor: 'silver',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default PickerComponent;
