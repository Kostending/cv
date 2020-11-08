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
    // const gameImage = useSelector(selectGameImage);
    let gameImage;
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
                                console.log(image.default);
                                imageRef.current.src = image.default;
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
                <h1>Game Of Thrones Tamagochi</h1>
            </div>
            <div className="container-row">
                <div className="item" id={styles.gameItemContainer}>
                    <h1>{playerName}</h1>
                    <img className={styles.gameImage}
                         src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBg0QEBIPEA4QEBEQFRgQDRcQExAaFhUWFiATFRUYHSggGB4lGxgWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDy0ZFRkrLSs3Ky0tLisrKzctNy0rNystLS0rKysrKy0rLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADQQAQACAAMFBQcCBwEAAAAAAAABAgMEEQUSITFhQVFxgbETIlKRocHRFDQyQnKCkuHxJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/TAGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAHVKTiW0iJmegOX2I1nSOM9F2mzL25zWv1lo5fLVy9eEce2Z5yauMzC2de8cdKx15/KE9dld9p8qtITVZ07Kj4p/wAUd9l2jlaJ8Y0aoaMHFyl8LnWdO+OMIHpVTNZGuNEzHu2747fGDUxijvFwpwbzW0aT69YcKgAAAAAAAAAAAAAAAAAA3Mjl/YYMfFPGfwx8vTfzFI77Q9ClWACKAAAAAAgzmXjMYWn80cpYUxuzMTzjg9IyNq4W5jxaOVo+sLEqiAqAAAAAAAAAAAAAAAALOz41zlPP0luMPZv7yvn6S3EqwARQAAAAABS2rTeyuvwzE/b7rqttGf8Ax316esAwwGmQAAAAAAAAAAAAAAAFrZ37ynn6S22FkJ0zlPH7S3UqwARQAAAAABibStM5u0azpGmnHlwhtsHPTrnL+P2WCABWQAAAAAAAAAAAAAAAE+SiZzNJiJmItHZybyHJ03MtSI7on5pkrQAgAAAAAAMDNxP6m+sTGtp5xz4t9U2nTeylp7Y0mPmsGKArIAAAAAAAAAAAAAAADc2fffylOnD5LLN2PicL1/uj0/DSZaAAAAAAAAFLa193LafFMR8uK6ydr4m9jVr8MeqwUAFZAAAAAAAAABQAAAAAEmXxpwMWLR/1t5XH/UYMW005xprrowGnsfE4Xr/d9vwlGkAigAAAAAIM3mP02Frprx056MPExJxMSbTzmdWhti/GlfGft+Wa1EAAAAAAAAAAABAAAAAABNlMb2GPW3ZynwlCA9LE6wKWysSb5eYn+WdIXWWgAAAAFbaN5plLadI+YMrOYvtszaezlHhCAGkABAAAAAAAAAAAAAAAAAAGxsmNMtPW0+kLqts+m5k6ddZ+c6rLLQAAAArbRjXJ38p+sLKPMU38C8d9Zj6A88A0yAAAAAAAAAAAAAAAAAAOqV37xEc5nQpSb20iJmejVyGS9jO9b+L0FXaxu1iO6NH0GVAAAAAAefzWH7LMWjrrHhKJt57KfqK6xwtHLr0lj4mHOFbS0TEtRHAAgAAAAAAAAAAAAPsRvTpHGei9l9mzfjf3Y7o5/wChVGtd+2kRMz0X8vsybcbzpHdHP5tHBwK4NdKxEes+aRNMR4WDXBrpWIhICKAAAAAAAAOcTDjErpaImOroBmZjZnbSfKftLPxMOcO2lomJ6vRuMTDjFrpaImOq6jzo0cxszTjSdek/aVC9JpbSYmJ6qOQBAAAAAH2OMg+LeVyNsbjPu1+s+ELeSyG5EWvxt2R2R+ZX01cRYGXrgR7sce+eMz5pQRQAAAAAAAAAAAAAAABHjYNcaulo19Y80gDIzOzpw+Nfej6x+VF6VTzmRjHiZrwv9J8VlTGMOrVmlpieEw5VAABpbKy2vvz4V/LOrG9aIjnM6PRYVPZ4cVjlEaFWOgGVAAAAAAAAAAAAAAAAAAAAAAUdqZffw9+P4q8+sMh6WY1h57Hw/ZY1q90rEqMBUTZX9zh/1R6t8EqwARQAAAAAAAAAAAAAAAAAAAAABibS/eW8vSAWJVUBUf/Z"
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
