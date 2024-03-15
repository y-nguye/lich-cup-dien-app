import React from 'react';
import { View, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export default function ScreenWrapper({ children }) {
    const headerHeight = useHeaderHeight();

    return (
        <ScrollView>
            <View
                style={{
                    height: headerHeight,
                }}
            ></View>
            {children}
            <View className="h-8"></View>
        </ScrollView>
    );
}
