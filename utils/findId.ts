// Used to find a given element in the SORTED array (recursive alternative to array.find())

export const findId = function(id: string, array: string[], pointer: number = Math.floor(array.length / 2)): boolean {
    if(id !== array[pointer]) {
        if(array.length <= 1) return false;
        else {
            let newArr;
            if(id < array[pointer])  newArr = array.slice(0, pointer);
            else newArr = array.slice(pointer + 1);
            return findId(id, newArr, Math.floor(newArr.length / 2));
        }
    }
    return true;
}