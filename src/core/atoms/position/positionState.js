import { atom } from "recoil";

export const PositionState = atom({
    key: 'POSITION_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: []
    }, // default value (aka initial value)
});