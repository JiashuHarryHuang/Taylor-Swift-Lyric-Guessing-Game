import axios from 'axios'
const BASE_URL = 'http://localhost:8080/'

/**
 * Generate a random number from [1, totalLines] and send a get request 
 * to get the lyric object with that index
 * @param {*} totalLines Total number of lines of lyric in CSV
 */
export function getLyric(totalLines) {
    //Generate a random value from [0, totalLines - 1]
    let randomNum = Math.floor(Math.random() * totalLines);
    //Send a get request for the lyric object
    return axios.get(BASE_URL + randomNum).then((response) => {
        return response.data;
    })
}

/**
 * Send a get request to get the total number of lines of lyric in CSV
 */
export function getTotalLines() {
    //Send a get request for the total lines of lyrics
    return axios.get(BASE_URL).then((response) => {
        return response.data;
    })
}