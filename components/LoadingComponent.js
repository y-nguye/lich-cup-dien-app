import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function LoadingComponent() {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View className="mx-auto mt-16">
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <AntDesign name="loading1" size={24} color="black" />
            </Animated.View>
        </View>
    );
}
