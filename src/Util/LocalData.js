

export const setLocalData = (value) => {
    try {

        window.localStorage.setItem("data", JSON.stringify(value));

    } catch (e) {
        return;
    }
}

export const fetchLocalData = () => {
    try {

        let data = window.localStorage.getItem("data");

        return JSON.parse(data);

    } catch (e) {
        return {};
    }
}

