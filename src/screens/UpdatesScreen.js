import { View, Text, ScrollView, ImageBackground, Image, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { LeagueStandings } from '../constants/ApiSimulator';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import NewsComponent from '../components/NewsComponent';
import Loading from '../components/Loading';

export default function UpdatesScreen() {
    const [standings, setStandings] = useState([]);
    const [news, setNews] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const { isDarkMode } = useTheme(); // Access the theme
    const [selectedNewsUrl, setSelectedNewsUrl] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const [leagueIndex, setLeagueIndex] = useState(0); // State to track the current league index
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        const extractedStandings = LeagueStandings.api.standings[leagueIndex];
        setStandings(extractedStandings);
        setTimeout(() => {
            setRefreshing(false);
            setIsloading(false)
        }, 2000);
    }, [leagueIndex]);

    useEffect(() => {
        // Extract the standings array from LeagueStandings object
        const extractedStandings = LeagueStandings.api.standings[leagueIndex]; // Use leagueIndex to fetch standings for the current league
        setStandings(extractedStandings);
        setIsloading(false)
    }, [leagueIndex]); // Fetch standings when the leagueIndex changes

    if (isLoading) return (<Loading />)

    const switchLeague = (direction) => {
        if (direction === 'next') {
            setLeagueIndex((prevIndex) => (prevIndex + 1) % LeagueStandings.api.standings.length); // Switch to the next league
        } else if (direction === 'prev') {
            setLeagueIndex((prevIndex) => (prevIndex - 1 + LeagueStandings.api.standings.length) % LeagueStandings.api.standings.length); // Switch to the previous league
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <ScrollView style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={{ paddingHorizontal: 2 }}>
                    {/* Arrows to switch between leagues */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => switchLeague('prev')}>
                            <Text style={[styles.arrow, { color: isDarkMode ? '#fff' : '#000' }]}>◀️</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: isDarkMode ? '#fff' : '#000' }}>League {leagueIndex + 1}</Text>
                        <TouchableOpacity onPress={() => switchLeague('next')}>
                            <Text style={[styles.arrow, { color: isDarkMode ? '#fff' : '#000' }]}>▶️</Text>
                        </TouchableOpacity>
                    </View>
                    {/* League standings */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000', flex: 0.5 }}>Rank</Text>
                        <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000', flex: 1.5 }}> Team</Text>
                        <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000', flex: 0.7, textAlign: 'right', marginLeft: heightPercentageToDP(4) }}>Forme</Text>
                        <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000', flex: 0.7, textAlign: 'center', marginLeft: heightPercentageToDP(2) }}>GD</Text>
                        <Text style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000', flex: 0.7, textAlign: 'center', marginLeft: heightPercentageToDP(0.6) }}>Points</Text>
                    </View>
                    {standings.map(team => (
                        <>
                            <View key={team.team_id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                <Text style={{ flex: 0.5, color: isDarkMode ? '#aaa' : '#666' }}>{team.rank}</Text>
                                <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: team.logo }} style={{ width: 20, height: 20, marginRight: 3 }} />
                                    <Text style={{ color: isDarkMode ? '#aaa' : '#666', fontWeight: 'bold' }}>{team.teamName}</Text>
                                </View>
                                <Text style={{ flex: 0.7, textAlign: 'left', marginLeft: heightPercentageToDP(5) }}>
                                    {team.forme.split('').map((char, index) => (
                                        <Text key={index} style={{ color: char === 'W' ? '#2E8B57' : char === 'L' ? '#EE4B2B' : (isDarkMode ? '#aaa' : '#666') }}>{char}</Text>
                                    ))}
                                </Text>
                                <Text style={{ flex: 0.7, textAlign: 'center', marginLeft: 0, color: isDarkMode ? '#aaa' : '#666' }}>{team.goalsDiff}</Text>
                                <Text style={{ flex: 0.7, textAlign: 'center', marginLeft: 0, color: isDarkMode ? '#aaa' : '#666' }}>{team.points}</Text>
                            </View>
                            <View key={team + '_'}
                                style={{
                                    borderBottomColor: isDarkMode ? '#BDBDBD' : '#464646',
                                    opacity: 0.5,
                                    borderBottomWidth: widthPercentageToDP(0.05),
                                }}
                            />
                        </>
                    ))}
                </View>
                {/* News component */}
                <View style={{ marginTop: heightPercentageToDP(2) }}>
                    <Text className='font-bold text-xl' style={{ color: isDarkMode ? 'white' : 'black' }}>News</Text>
                    <NewsComponent />
                </View>
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    arrow: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
});
