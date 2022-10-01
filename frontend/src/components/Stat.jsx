import { Score } from './Game';
import '../style/stat.css';

/**
 * Stat component
 */
export default function Stat() {
    return (
        <>
            <Score.Consumer>
                {
                    // Receive data from Game component and display them
                    ([score, TOTAL_ROUND, currentRound]) => {
                        return (
                            <div className="stat">
                                Current round: {currentRound} <br />
                                You scored {score} out of {TOTAL_ROUND}
                            </div>

                        )
                    }
                }
            </Score.Consumer>
        </>
    )
}
