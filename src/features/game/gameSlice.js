import {createSlice} from '@reduxjs/toolkit';

const initialValuesForState = {
    fedness: 10,
    health: 10
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        initiated: false,
        gameOver: false,
        name: '',
        stats: {
            fedness: initialValuesForState.fedness,
            health: initialValuesForState.health
        },
        lastUpdate: new Date().getTime()
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setInitiated: (state, action) => {
            state.initiated = action.payload;
        },
        setLastUpdate: (state, action) => {
            state.lastUpdate = action.payload;
        },
        timeTickFedness: (state, action) => {
            if (state.stats.fedness !== 0) {
                state.stats.fedness--;
            }
        },
        timeTickHealth: (state, action) => {
            if (state.stats.fedness === 0 && state.stats.health !== 0) {
                state.stats.health--;

                if (state.stats.health === 0) {
                    state.gameOver = true;
                }
            } else {
                if (state.stats.health < initialValuesForState.health) {
                    state.stats.health++;
                }
            }
        },
        incrementFedness: (state, action) => {
            const newFedness = state.stats.fedness += action.payload;

            if (initialValuesForState.fedness <= newFedness) {
                state.stats.fedness = initialValuesForState.fedness
            } else {
                state.stats.fedness = newFedness;
            }
        },
    },
});

export const {setName, setInitiated, setLastUpdate, timeTickFedness, timeTickHealth, incrementFedness, setGameImage} = gameSlice.actions;

export const selectInitiated = state => state.game.initiated;
export const selectStats = state => state.game.stats;
export const selectName = state => state.game.name;

export default gameSlice.reducer;
