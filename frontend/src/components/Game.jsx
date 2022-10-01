//React
import React, { createContext, useState, useEffect } from 'react';

//Stat component
import Stat from './Stat';

//CSS
import '../style/game.css';

//API methods
import { getTotalLines, getLyric } from '../api/game-api';

//Ant-design UI components
import { CheckOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';

//Context
const Score = createContext();

/**
 * Game component
 */
export default function Game() {
    /**
     * Binds to the Lyric object that backend sends
     */
    const [lyric, setLyric] = useState({});

    /**
     * Binds to answer that user enters
     */
    const [answer, setAnswer] = useState("");

    /**
     * Current round out of 5
     */
    const [currentRound, setCurrentRound] = useState(1);

    /**
     * Total number of rounds
     */
    const TOTAL_ROUND = 5;

    /**
     * Score that user gets for this round
     */
    const [score, setScore] = useState(0);

    /**
     * Total number of lyrics
     */
    const [totalLines, setTotalLines] = useState(0);

    /**
     * Control the state of modal. Default state is hidden.
     */
    const [isModalOpen, setIsModalOpen] = useState(false);


    /**
     * When the server is launched, call the two api functions
     */
    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            //Send two GET requests for total lines and lyric object
            let totalLineResult = await getTotalLines();
            let lyricResult = await getLyric(totalLineResult.data);

            if (mounted) {
                setLyric(lyricResult.data);
                setTotalLines(totalLineResult.data);
            }
        }
        if (mounted) {
            fetchData();
        }
        return () => mounted = false;

    }, [])

    /**
     * Randomly get a line of lyric from the backend
     */
    const updateLyric = () => {
        getLyric(totalLines).then(response => {
            setLyric(response.data);
        });
    }

    /**
     * Check whether the answer matches the lyric
     * @param event click/enter
     */
    const checkAnswer = (event) => {
        event.preventDefault();

        //Check whether the answer matches the lyric
        if (answer.toLowerCase() === lyric.trackTitle.toLowerCase()) {
            //If yes, increment score by 1
            setScore(score + 1);
            message.success('Correct!');
        } else {
            //Display the correct answer
            message.error('Sorry, the answer is: ' + lyric.trackTitle);
        }

        //Next round
        setCurrentRound(currentRound + 1);

        //Determine if it's the end of game
        if (currentRound < TOTAL_ROUND) {
            //Generate another line of lyric
            updateLyric();
        } else {
            restart();
        }
        setAnswer('');

    }

    /**
     * Display modal
     */
    const showModal = () => {
        setIsModalOpen(true);
    };

    /**
     * Hide the mod
     */
    const handleCancel = () => {
        //Cheating a little here
        handleOk();
    };

    /**
     * Restart the game
     */
    const handleOk = () => {
        setIsModalOpen(false);
        updateLyric();
        //Reset data
        setScore(0);
        setCurrentRound(1);
    };

    /**
     * Display the result and ask if user wants to restart
     */
    const restart = () => {
        //Pop out a box to show the statistics
        showModal();
    }

    return (
        <>
            {/* Send the values of score, currentRound, total round to Stat component */}
            <Score.Provider value={[score, TOTAL_ROUND, currentRound]}>
                <Stat />
            </Score.Provider>
            <div className="game">

                {/* Display the lyric */}
                <div className="lyric">
                    {lyric.lyric}
                </div>

                {/* Prompt user for an answer */}
                <form id="answer" onSubmit={checkAnswer}>
                    <label htmlFor="answer">Which song does this line come from? </label>
                    <div className="answer">
                        {/* Bind the input value with answer state */}
                        <Input value={answer} type="text" id="answer" onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                    <Button type="button" onClick={checkAnswer} shape="circle" icon={<CheckOutlined />} />
                </form>

                {/* Modal asking whether the user wants to restart */}
                <Modal title="Here's your game stat" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    okText="Restart?" cancelText="I'm good">
                    <p>You have scored {score} out of {TOTAL_ROUND} </p>
                </Modal>
            </div>
        </>
    )
}
export { Score };