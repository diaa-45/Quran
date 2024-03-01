function countOccurrences(text, word) {
    if (!text) {
        return 0;
    }
    const regex = new RegExp(word, 'gi');
    const result = text.match(regex);
    return result ? result.length : 0;
}

console.log(countOccurrences(" الرحيم الله الله الرحمن", "الله")); // Output: 1
