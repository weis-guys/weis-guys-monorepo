import getConfig from 'next/config'
import type { AppConfig } from '../AppConfig'

/**
gets `publicRuntimeConfig` from next.config.js

```
--- next.config.js ---
    module.exports = {
        publicRuntimeConfig: {
            // your data here
        },
        ...
    }
```
*/
export const getNextJSRuntimeConfig = (): AppConfig => getConfig().publicRuntimeConfig