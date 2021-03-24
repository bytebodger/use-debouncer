import { useSynchronousState } from '@toolz/use-synchronous-state';
import { allow } from '@toolz/allow';

export const useDebouncer = () => {
   allow.setFailureBehavior(allow.failureBehavior.WARN);
   const [getInflightCalls, setInflightCalls] = useSynchronousState([]);
   
   const addApiCall = (url = '') => {
      allow.aString(url, is.not.empty);
      const inflightCalls = getInflightCalls();
      inflightCalls.push(url);
      setInflightCalls([...new Set(inflightCalls)]);
      return getInflightCalls();
   };
   
   const clearApiCalls = () => {
      setInflightCalls([]);
      return getInflightCalls();
   };
   
   const isAlreadyInFlight = (url = '') => {
      allow.aString(url, is.not.empty);
      const inflightCalls = getInflightCalls();
      return inflightCalls.includes(url);
   };
   
   const removeApiCall = (url = '') => {
      allow.aString(url, is.not.empty);
      let inflightCalls = getInflightCalls();
      inflightCalls = inflightCalls.filter(thisUrl => thisUrl !== url);
      setInflightCalls([...new Set(inflightCalls)]);
      return getInflightCalls();
   };
   
   const is = {not: {empty: 1}};
   
   return {
      addApiCall,
      clearApiCalls,
      isAlreadyInFlight,
      removeApiCall,
   };
};
