import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Service from '../services/Service';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function NewsComponent() {
    const [selectedNewsUrl, setSelectedNewsUrl] = useState(null);
    const [topStories, setTopStories] = useState([]);

    useEffect(() => {
        fetchTopStories();
    }, []);

    const fetchTopStories = async () => {
        try {
            const data = await Service.getTrends();
            console.log('Fetched top stories:', data); // Log the fetched data
            setTopStories(data);
        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    };
    

    const openWebView = async (url) => {
        await WebBrowser.openBrowserAsync('https://www.livescore.com' + url);
    };


    const InvalidURLPlaceHolder = 'https://www.stadiummanagement.co.za/wp-content/uploads/2015/07/news-header-football.jpg';

    return (
        <View style={{ flex: 1, marginVertical: heightPercentageToDP(2) }}>
            {topStories.map((item) => (
                <TouchableOpacity
                    key={item.newsid}
                    onPress={() => openWebView(item.newsurl)}
                    style={styles.container}
                    activeOpacity={0.8}
                >
                    <ImageBackground
                    key={item.imgurl}
                        source={{ uri: item.imgurl || InvalidURLPlaceHolder }}
                        style={styles.imageBackground}
                        resizeMode="cover"
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.caption}</Text>
                            <Text style={styles.publishedAt}>{new Date(item.publishedAt).toDateString()}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: heightPercentageToDP(3),
        overflow: 'hidden', // Ensures that the image background stays within its container
        borderRadius: 10,
    },
    imageBackground: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end', // Aligns the text container to the bottom
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text readability
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white', // Text color
    },
    publishedAt: {
        color: 'white', // Text color
        marginTop: 5,
    },
});