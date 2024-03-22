import axios from "axios";

class Service {

    static async getBets() {
        try {
            const res = await axios.get('https://betting.ioevisa.net/public/api/otherbets');
            return res.data;
        } catch (error) {
            console.error('Error', error);
            throw error; // Re-throw the error to handle it elsewhere
        }
    }

    static async getTrends() {
        try {
            const res = await axios.get('http://192.168.0.186:8000/api/news');
            console.log('results:', res.data);
            return res.data;
        } catch (error) {
            console.log('error:', error);
            throw error;
        }
    }
}

export default Service;
