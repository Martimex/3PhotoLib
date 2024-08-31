// Sorts an array items by their ID
// Each ID item has to be string with a provider name applied on prepend (f.e. "pixabay=123" & "pexels=123")

export const sortById = function(arrayToSort: any[]) {
    if(!arrayToSort.length) return arrayToSort;
    return quickSort(arrayToSort, 0, arrayToSort.length - 1, arrayToSort.length);
}

function quickSort(arr: string[], leftPos: number, rightPos: number, arrLength: number) {
    let [leftPos_start, rightPos_start]  = [leftPos, rightPos];
    let direction = true;
    let pointer = rightPos;
    while ((leftPos - rightPos) < 0) {
        if (direction) {
            if (arr[pointer] < arr[leftPos]) {
                let elementToSwap = arr[pointer];
                arr[pointer] = arr[leftPos];
                arr[leftPos] = elementToSwap;
                direction = !direction;
                pointer = leftPos;
                rightPos--;
            } else leftPos++;
                
        } else {
            if (arr[pointer] > arr[rightPos]) {
                let elementToSwap = arr[pointer];
                arr[pointer] = arr[rightPos];
                arr[rightPos] = elementToSwap;
                direction = !direction;
                pointer = rightPos;
                leftPos++;
            } else rightPos--;
        }
    }
    if (pointer - 1 > leftPos_start) {
        quickSort(arr, leftPos_start, pointer - 1, arrLength);
    }
    if (pointer + 1 < rightPos_start) {
        quickSort(arr, pointer + 1, rightPos_start, arrLength);
    }
    return arr;
}