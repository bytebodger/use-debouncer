import { useDebouncer } from './use.debouncer';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

test('useDebouncer()', () => {
   const TestComponent = () => {
      const debouncer = useDebouncer();
      
      useEffect(() => {
         const route1 = '/some/test/route1';
         const route2 = '/some/test/route2';
         expect(debouncer.isAlreadyInFlight(route1)).toEqual(false);
         expect(debouncer.addApiCall(route1)).toEqual([route1]);
         expect(debouncer.isAlreadyInFlight(route1)).toEqual(true);
         expect(debouncer.addApiCall(route1)).toEqual([route1]);
         expect(debouncer.addApiCall(route2)).toEqual([route1, route2]);
         expect(debouncer.isAlreadyInFlight(route2)).toEqual(true);
         expect(debouncer.removeApiCall(route1)).toEqual([route2]);
         expect(debouncer.clearApiCalls()).toEqual([]);
      }, []);
      return <></>;
   };
   render(
      <TestComponent/>);
});
