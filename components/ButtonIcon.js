import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';

export default function ButtonIcon({ target, icon, title }) {
    const navigation = useNavigation();

    return (
        <GestureHandlerRootView>
            <TouchableOpacity onPress={() => navigation.navigate(target)}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <EvilIcons
                        name={icon}
                        size={32}
                        color="#4083fa"
                        style={{ marginRight: 5 }}
                    />
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
}
