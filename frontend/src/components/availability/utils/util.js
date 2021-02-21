const formatTimeLeft = (state) => {
    let totalSeconds = Math.floor(state / 1000);
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    return (min === 0 && sec === 0 ? "" : `${min}:${sec}`);
};

export {
    formatTimeLeft
};