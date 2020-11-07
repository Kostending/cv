import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './gameSlice';
import styles from './Game.module.css';

export function StartGame() {
  console.log('Starting Game');
  const iceAndFireEndpoint = 'https://anapioficeandfire.com/api/';

  const response = fetch(`${iceAndFireEndpoint}/books/1`)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        console.log('gettin json');
        response.json().then((data) => {          
          const listOfPovCharacters = Object.values(data.povCharacters);
          const numberOfPovCharacters = listOfPovCharacters.length;

          if (numberOfPovCharacters) {
            const randomCharacterId = Math.floor(Math.random() * Math.floor(numberOfPovCharacters));
            const randomCharacterUrl = data.povCharacters[randomCharacterId];

            console.log(randomCharacterUrl);

            fetch(randomCharacterUrl)
              .then((response) => {
                console.log(data);
              });
          }
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}
