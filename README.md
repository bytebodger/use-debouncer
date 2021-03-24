# use-debouncer

A custom React Hook for tracking which API calls are currently in-flight. The intention is to keep duplicate "fat-fingered" requests from being made to an API - e.g., when user double/triple clicks on a "Submit" button.

## Methodology

The Hook uses a simple queue (`Array`) of strings - presumably, those strings represent endpoint URLs. It is up the caller to add new calls to the queue, and to remove old calls once a response is received.

## Usage

```javascript
export const useApi = () => {
   const debouncer = useDebouncer();
   
   const post = async (url = '', data = {}, headers = {}) => {
      if (debouncer.isAlreadyInFlight(url))
         return;
      const response = await axios({
         data,
         headers,
         method: 'POST',
         url,
      }).catch(error => {
         debouncer.removeApiCall(url);
      });
      debouncer.removeApiCall(url);
      return response;
   }
   
   return {
      post
   }
}
```

## Methods

### .addApiCall()

```javascript
const API = {
   arguments: {
      url: {
         required,
         format: non - empty string,
      },
   },
   returns: Array of inflight calls,
}
```

### .clearApiCalls()

```javascript
const API = {
   arguments: {
      // none
   },
   returns: Array of inflight calls,
}
```

### .isAlreadyInFlight()

```javascript
const API = {
   arguments: {
      url: {
         required,
         format: non - empty string,
      },
   },
   returns: Boolean,
}
```

### .removeApiCall()

```javascript
const API = {
   arguments: {
      url: {
         required,
         format: non - empty string,
      },
   },
   returns: Array of inflight calls,
}
```

**Examples:**

```javascript
const SomeComponent = () => {
   const debouncer = useDebouncer();
   const endpoint = '/some/endpoint';
   
   const sendRequest = async () => {
      if (debouncer.isAlreadyInFlight(endpoint))
         return;
      debouncer.addApiCall(endpoint);
      await doTheApiCall()
         .catch(() => debouncer.removeApiCall(endpoint));
      debouncer.removeApiCall(endpoint);
   }
   
   return <>
      <button onClick={sendRequest}>
         Send
      </button>
      <br/>
      <button onClick={debouncer.clearApiCalls}>
         Clear
      </button>
   </>
}
```
