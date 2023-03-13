function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

const arrPlayer = ["Tina", "Jorge", "Julien"]

const getResults = async (arrPlayer) => {
    try {
        const res =  await luckyDraw(arrPlayer);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
};

arrPlayer.map(res => getResults(res))
