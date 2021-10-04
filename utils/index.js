

export const constrain = (enteredValue, minEntry, maxEntry, normalizedMin = 0 , normalizedMax = 5) => {
    var mx = (enteredValue-minEntry)/(maxEntry-minEntry);
    var preshiftNormalized = mx*(normalizedMax-normalizedMin);
    var shiftedNormalized = preshiftNormalized + normalizedMin;

    return shiftedNormalized;

}