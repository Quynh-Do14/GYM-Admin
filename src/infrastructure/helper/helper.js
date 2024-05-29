import moment from "moment";
import Constants from "../../core/common/constant";
import dayjs from "dayjs";
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
        return dayjs(dateFormat).format("DD-MM-YYYY hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date) => {
    if (date) {
        return moment(date, 'DD-MM-YYYY HH:mm:ss').format("DD/MM/YYYY");
    } return null;
};

export const convertTimeOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

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

export const convertTimeParams = (date) => {
    if (date) {
        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // Tháng trong JavaScript đếm từ 0 đến 11
        const day = inputDate.getDate();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const seconds = inputDate.getSeconds();

        // Chuyển đổi các giá trị thành chuỗi và thêm số 0 đằng trước nếu cần thiết
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedDate
    } return null;
};

export const convertDateBooking = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

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
    if (gender == Constants.Gender.MALE.value) {
        return Constants.Gender.MALE.label;
    }
    else if (gender == Constants.Gender.FEMALE.value) {
        return Constants.Gender.FEMALE.label
    }
}
export const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
