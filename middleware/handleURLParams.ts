import { availableProviderNames_Array } from "~/types/type_utilities";
import type { availableProviderNames } from "~/types/type_utilities";
import PhotoProvider from '@/providers/photoProvidersInitializer';

export default defineNuxtRouteMiddleware(async(to, from) => {

    function checkValuesRange(value: number, min: number, max: number): true | 'min' | 'max' {
        if(min > value) return 'min';
        if(max < value) return 'max';
        return true;
    }

    function checkIfParamIsNotAvailable(param: string): void {

        for(let optionalParam of availableOptionalParams) {
            const searchValue = `${optionalParam.key}` + '=';
            const regex = new RegExp(`^` + searchValue);
            const isAvailable = regex.test(param);
            if(isAvailable) {
                // Now let's check if the value is of correct type and if it's within accepted range
                const paramValue_string = param.replace(searchValue, "");
                if(optionalParam.type === 'number') {
                    const isValueANumber = /^\d+$/.test(paramValue_string);
                    if(isValueANumber) {
                        // Value is a number! Now let's check if the value is within the accepted scope of a given state variable
                        const paramValue_number = parseInt(paramValue_string);
                        const isWithinValuesRange = checkValuesRange(paramValue_number, sqStore[optionalParam.controlValues].min, sqStore[optionalParam.controlValues].max);
                        
                        // Now set the URL value to the state varibale (update both .current - number input text, and main API query value)
                        if(isWithinValuesRange === true) { 
                            sqStore[optionalParam.refersTo] = paramValue_number; // controls API calls
                            sqStore[optionalParam.controlValues].current = paramValue_number; // controls Advanced Menu UI input value
                        }                   
                        else {
                            sqStore[optionalParam.refersTo] = sqStore[optionalParam.controlValues][isWithinValuesRange]; // controls API calls
                            sqStore[optionalParam.controlValues].current = sqStore[optionalParam.controlValues][isWithinValuesRange]; // controls Advanced Menu UI input value
                        }

                        // Param and a value are all fine - so lets store them in an array, to further recreate a URL with those params
                        variablesToUpdate.push({key: optionalParam.key, value: paramValue_number})
                    }
                } else if(optionalParam.type === 'string') {
                    switch(optionalParam.key) {
                        case 'provider': {
                            const isParamValueCorrect = availableProviderNames_Array.find(provider => provider === paramValue_string);
                            if(isParamValueCorrect) {
                                const paramValue_provider = paramValue_string as availableProviderNames;
                                sqStore[optionalParam.refersTo] = paramValue_provider;
                                sqStore.currPhotoProvider = new PhotoProvider(paramValue_provider).setCurrentProvider();
                                variablesToUpdate.push({key: optionalParam.key, value: paramValue_provider});
                            }
                            break;
                        } 
                        default: {};
                    }
                }
            }
        }
    }

    const { availableOptionalParams } = useSearchQueryStore();
    
    // We use this declaration like so because we need a bracket notation access to properties
    // Type is set as any, because the provided string as sqStore keys would refer to actual properties, which we want to dynamically apply during the process.
    const sqStore = useSearchQueryStore() as any;

    const variablesToUpdate: {key: string, value: number | string}[] = [];

    // Cast as only string (and not string[]) since the target URL contain just one param
    const query = to.params.query as string;
    
    const optionalParams = query.split('&');

    // Set the searchText to the first element of optionalParams[], as it is the actual query
    sqStore.queryText = optionalParams[0];

    if(optionalParams.length === 1) { return; /* No extra params are provided for URL, no need to check anything */ }

    optionalParams.forEach((param, index) => index > 0 && checkIfParamIsNotAvailable(param));
    //const paramsToRemove = optionalParams.filter(param => );

    let finalQuery: string = '';

    if(optionalParams.length > 1) {
        // Start counting from index 1 (not 0), because the first part is actually the query text, so it CANNOT be purged
        finalQuery = query.slice(0, query.indexOf('&'));
        // Now apply some optional params caught
        for(let j=0; j<variablesToUpdate.length; j++) { finalQuery += `&${variablesToUpdate[j].key}=${variablesToUpdate[j].value}` }
    }

    await navigateTo(`/home/results=${finalQuery}`);
});