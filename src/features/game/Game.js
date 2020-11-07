import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  setInitiated,
  selectName,
  selectInitiated
} from './gameSlice';

import styles from './Game.module.css';

export async function StartGame() {
  console.log('Starting Game');
  const gameIsActive = useSelector(selectInitiated);
  const playerName = useSelector(selectName);

  const dispatch = useDispatch();
  
  if(!gameIsActive){
    dispatch(setInitiated(true));

    if (playerName === '') {
      console.log('case');
      // Refactor to designated function
      const iceAndFireEndpoint = 'https://anapioficeandfire.com/api/';

      const response = await fetch(`${iceAndFireEndpoint}/books/1`);

      if(response.ok) {
        const json = await response.json();

        const listOfPovCharacters = Object.values(json.povCharacters);
        const numberOfPovCharacters = listOfPovCharacters.length;

        if (numberOfPovCharacters) {
          const randomCharacterId = Math.floor(Math.random() * Math.floor(numberOfPovCharacters));
          const randomCharacterUrl = listOfPovCharacters[randomCharacterId];

          const characterResponse = await fetch(randomCharacterUrl);
          
          if(characterResponse.ok) { 
            const characterJson = await characterResponse.json();

            dispatch(setName(characterJson.name));
          }
        }

      } else {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
      }
    } else {
      console.log('no, this case'); 
    }
  }
}