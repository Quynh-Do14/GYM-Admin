import { atom } from "recoil";

export const MemberCardState = atom({
    key: 'MEMBER_CARD_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: []
    }, // default value (aka initial value)
});