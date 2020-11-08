// I understand this is not generally what you wanna do, but to me it seemed best to have the gameloop outside of a React context
import store from '../../app/store'
import {
    setLastUpdate,
    timeTickFedness,
    timeTickHealth
} from './gameSlice';

export function startLoop() {
    // How often does game update
    const loopDelta = 5000;

    function main() {
        const mainLoop = window.requestAnimationFrame( main );

        const state = store.getState().game;

        const lastUpdate = state.lastUpdate;
        const now = new Date().getTime();

        // All game updates
        if(now > lastUpdate + loopDelta) {
            store.dispatch(setLastUpdate(now));
            store.dispatch(timeTickFedness());
            store.dispatch(timeTickHealth())

            const updatedState = store.getState().game;
            if (updatedState.gameOver) {
                cancelAnimationFrame(mainLoop);
            }
        }
    }

    main();
}
