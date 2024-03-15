import { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import LocationContext from '../LocationContext';

import LoadingComponent from './LoadingComponent';

export default function ListComponent() {
    const { location, loading, setLoading } = useContext(LocationContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location) {
                    // Chỉ gọi fetchData() khi location có giá trị hợp lệ
                    const response = await fetch(
                        `https://ynguyen.id.vn/crawler/api/lich-cup-dien/${location}`
                    );
                    const jsonData = await response.json();
                    setData(jsonData.data);
                    setLoading(false); // Sau khi lấy dữ liệu thành công, đặt loading thành false
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Nếu có lỗi, đặt loading thành false để ngăn việc lấy dữ liệu không kết thúc
            }
        };

        fetchData();
    }, [location]);

    // Hiển thị một thông báo hoặc indicator loading trong khi dữ liệu đang được tải
    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <View>
            {data.length
                ? data.map((item, index) => (
                      <View
                          key={index}
                          className="border-solid border-2 border-sky-500 rounded-lg mt-2 ml-2 mr-2 p-2 "
                      >
                          <BlurView intensity={10}>
                              <Text className="text-lg">{item['Ngày:']}</Text>
                              <Text>{item['Thời gian:']}</Text>
                              <Text>
                                  <Text>Khu vực:</Text> {item['Khu vực:']}
                              </Text>
                              <Text>
                                  <Text>Điện lực:</Text> {item['Điện lực:']}
                              </Text>
                          </BlurView>
                      </View>
                  ))
                : null}
        </View>
    );
}
