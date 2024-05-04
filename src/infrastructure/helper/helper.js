import moment from "moment";
// import noImgShow from "../../assets/img/no-img-show.jpg";

export const validateFields = (isImplicitChange = false, key, isCheck, setError, error, message) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const numberToAlphabet = (number) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetSplit = alphabet.split("");
    if (number < alphabetSplit.length) {
        const result = alphabetSplit[number]
        return result
    }
    return number
}

export const convertDate = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD/MM/YYYY");
    } return null;
};

export const convertTimeOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

export const reverseConvertDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    // Format the date as "Thu, 26 Oct 2023 13:05:32 GMT"
    const formattedDate = inputDate.toUTCString();
    return formattedDate
}

// export const showImage = (img) => {
//     if (img) {
//         return img
//     }
//     else {
//         return noImgShow
//     }
// }

export const convertMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

export const convertMiliSecond = (miliSecond) => {
    const minutes = Math.floor(miliSecond / 1000 / 60);
    const remainingSeconds = (miliSecond / 1000 % 60).toFixed(0);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const getCurrentDateTimeISO = (originalDate) => {
    const year = originalDate.getUTCFullYear();
    const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getUTCDate()).padStart(2, '0');
    const hours = String(originalDate.getUTCHours()).padStart(2, '0');
    const minutes = String(originalDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(originalDate.getUTCSeconds()).padStart(2, '0');

    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
    return formattedDateString
}


export const timeToMilliseconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const milliseconds = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    return milliseconds;
}
export const minuteToMiliSecond = (minutes) => {
    const result = minutes * 60 * 1000;
    return result;
}

export const keepLastObjectsWithUniqueIds = (array) => {
    const idSet = {};
    const result = [];

    for (let i = array.length - 1; i >= 0; i--) {
        const obj = array[i];
        if (!idSet[obj.questionId]) {
            result.unshift(obj);
            idSet[obj.questionId] = true;
        }
    }
    return result;
}

export const checkPublishExam = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date()
    if (start <= now && now <= end) {
        return true
    }
    else {
        return false
    }
}

export const genderConfig = (gender) => {
    if (gender) {
        return 'Nam';
    }
    else {
        return "Nữ"
    }
}
// export const configResultType = (type) => {
//     let result = ""
//     Constants.ResultType.List.map(it => {
//         if (it.value == type) {
//             result = it.label
//         }
//     })
//     return result
// }