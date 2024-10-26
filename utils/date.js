function addMonthsToDate(dateStr, months) {
    let date = new Date(dateStr);

    let month = date.getMonth() + months;
    let year = date.getFullYear() + Math.floor(month / 12);

    month = month % 12;
    date.setFullYear(year);
    date.setMonth(month);

    const newDate = date.toISOString();
    return newDate;
}

export { addMonthsToDate };