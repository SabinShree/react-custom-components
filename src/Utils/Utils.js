function capitalizeFirstLetterOnly([firstLetter, ...rest]) {
    return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}

function convertObjectToCsv(data) {
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
        const values = headers.map(singleData => {
            const escaped = ('' + row[singleData]).replace(/"/g, '\\"').replace(/(\r\n|\n|\r)/gm, " ");
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    return csvRows.join("\n");
}

function isUserAuthenticate() {
    return localStorage.getItem("token") !== undefined;
}

export {capitalizeFirstLetterOnly, convertObjectToCsv, isUserAuthenticate};
