export const setUserDataToLocal = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
};