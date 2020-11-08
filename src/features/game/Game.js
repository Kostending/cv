import {useSelector, useDispatch} from 'react-redux';
import {
    setName,
    setInitiated,
    selectName,
    selectInitiated,
    selectStats,
    incrementFedness,
    setGameImage,
    selectGameImage
} from './gameSlice';
import styles from "./Game.module.css";
import React, {useEffect, useRef} from "react";
import {startLoop} from "./loop";

export function Game() {
    const feedAmount = 5
    const dispatch = useDispatch();

    const gameIsActive = useSelector(selectInitiated);

    const playerName = useSelector(selectName);
    const stats = useSelector(selectStats);
    const gameImage = useSelector(selectGameImage);
    const imageRef = useRef(null);

    useEffect(() => {
        if (!gameIsActive) {
            dispatch(setInitiated(true));

            const fetchData = async () => {
                // Refactor to designated function
                const iceAndFireEndpoint = 'https://anapioficeandfire.com/api/';

                const response = await fetch(`${iceAndFireEndpoint}/books/1`);

                if (response.ok) {
                    const json = await response.json();

                    const listOfPovCharacters = Object.values(json.povCharacters);
                    const numberOfPovCharacters = listOfPovCharacters.length;

                    if (numberOfPovCharacters) {
                        const randomCharacterId = Math.floor(Math.random() * Math.floor(numberOfPovCharacters));
                        const randomCharacterUrl = listOfPovCharacters[randomCharacterId];

                        const characterResponse = await fetch(randomCharacterUrl);

                        if (characterResponse.ok) {
                            const characterJson = await characterResponse.json();

                            dispatch(setName(characterJson.name));

                            const imageName = characterJson.name.replace(/\s+/g, '');
                            const lowercaseImageName = imageName.toLowerCase();
                            import(`../../assets/game/${lowercaseImageName}.jpg`).then(image => {
                                imageRef.current.src = image.default;
                                dispatch(setGameImage(image.default));
                            });
                            startLoop();
                        }
                    }
                } else {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                }
            }

            fetchData();
        }
    });

    const feed = () => dispatch(incrementFedness(feedAmount));

    return (
        <div id="game-container">
            <div className="container-row">
                <h1>TamaGoTchi</h1>
            </div>
            <div className="container-row">
                <div className="item" id={styles.gameItemContainer}>
                    <h1>{playerName}</h1>
                    <img className={styles.gameImage}
                         src={gameImage}
                         alt={playerName} ref={imageRef}/>
                </div>
                <div className="item" id="gamestat-container">
                    <ul>
                        {
                            Object.keys(stats).map(key => (
                                <li className={styles.statsContainer} key={key}>
                                    <span className="stat-name">{key}</span><span
                                    className="stat-value">{stats[key]}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className={styles.buttonContainer}>
                        <button id={styles.feedButton} onClick={feed}>FEED</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
