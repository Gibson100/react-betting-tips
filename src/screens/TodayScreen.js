import { View, Text, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import Service from '../services/Service';
import SearchBar from '../components/SearchBar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Loading from '../components/Loading';

export default function TodayScreen() {
    const { isDarkMode } = useTheme(); // Access the theme
    const [predictions, setPredictions] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading,setIsloading] = useState(true);

    useEffect(() => {
        // Fetch predictions when component mounts
        fetchPredictions();
        setIsloading(false)
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchPredictions();
        setTimeout(() => {
            setRefreshing(false);
            setIsloading(false)
        }, 2000);
    }, []);

    const fetchPredictions = async () => {
        try {
            const data = await Service.getBets();
            setPredictions(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching predictions:', error);
        }
    };

    let filteredPredictions = null

    if (typeof searchKeyword === 'string' && searchKeyword.trim() !== '') {
        // Get the filtered data
        filteredPredictions = filterData();
    } else {
        filteredPredictions = predictions;
    }

    // Function to filter data based on the search keyword
    const filterData = () => {
        // Check if searchKeyword is a string and not empty
        if (typeof searchKeyword === 'string' && searchKeyword.trim() !== '') {
            // Filter the leagues based on the search keyword
            const filteredLeagues = Object.fromEntries(
                Object.entries(predictions).filter(([league, matches]) =>
                    matches.some(match =>
                        match.team1.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        match.team2.toLowerCase().includes(searchKeyword.toLowerCase())
                    )
                )
            );
            return filteredLeagues;
        }
        else {
            // Return the original predictions if searchKeyword is not a string or empty
            ToastAndroid.show('Type something ...', 3)
            return predictions;
        }
    };

    if(isLoading) return (<Loading />)

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? '#222' : '#f4f4f4', paddingHorizontal: 10 }}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            {/* search section */}
            <SearchBar isDarkMode={isDarkMode} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

            <ScrollView
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {Object.entries(filteredPredictions).map(([league, matches], index) => (
                    <View key={league} style={{ width: '100%', marginVertical: 15, borderRadius: 10 }}>
                        <View style={{ backgroundColor: isDarkMode ? '#333' : '#ddd', width: '100%', paddingVertical: 8 }}>
                            <Text style={{ textAlign: 'center', color: isDarkMode ? '#fff' : '#000', fontWeight: 'bold', fontSize: hp(2.) }}>{league}</Text>
                        </View>
                        {matches.map((match, matchIndex) => (
                            <>
                                <View
                                    style={{
                                        borderBottomColor: isDarkMode ? 'white' : 'black',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                                <View key={match.id} style={{ width: '100%', backgroundColor: isDarkMode ? '#333' : '#fff', padding: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, color: isDarkMode ? '#fff' : '#000', fontSize: hp(2), fontWeight: '800' }} numberOfLines={2} ellipsizeMode='tail'>{match.team1}</Text>
                                        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 14, marginHorizontal: 10 }}>VS</Text>
                                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: isDarkMode ? '#fff' : '#000', fontSize: hp(2), fontWeight: '800' }} numberOfLines={2} ellipsizeMode='tail'>{match.team2}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ flex: 1, color: isDarkMode ? '#fff' : '#000', fontSize: 16 }}>Tip: {match.tip}</Text>
                                        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: hp(2), marginHorizontal: 10 }}>Scores: {match.results}</Text>
                                        <Text style={{ flex: 1, textAlign: 'right', color: isDarkMode ? '#fff' : '#000', fontSize: hp(2) }}>Results: <Text style={{ color: match.status === 'won' ? 'green' : match.status === 'lost' ? 'red' : '#938200' }} className="font-bold">{match.status}</Text></Text>
                                    </View>
                                </View>
                            </>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
