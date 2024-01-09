# Client for PM2-Prom-Module [![npm version](https://badge.fury.io/js/pm2-prom-module-client.svg)](https://www.npmjs.com/package/pm2-prom-module-client)

This client facilitates communication among all your concurrently running nodejs applications in PM2 with [PM2-Prom-Module](https://www.npmjs.com/package/pm2-prom-module). It transmits all of [prom-client](https://www.npmjs.com/package/prom-client) metrics, enhancing the monitoring and performance analysis of your applications.

## Install

```bash
npm install pm2-prom-module-client
```

## How to use

To establish communication between `pm2-prom-module` and your application, import the `initMetrics` function and provide your Registry as an argument.

Have a look on example:

```typescript
import client from 'prom-client';
import { initMetrics } from 'pm2-prom-module-client';

const registry = new client.Registry();
const PREFIX = `nodejs_app_`;

const metricRequestCounter = new client.Counter({
    name: `${PREFIX}request_counter`,
    help: 'Show total request count',
    registers: [registry],
});

// Register your prom-client Registry
initMetrics(registry);

// ...
app.get('/*', async (req: AppFastifyRequest, res) => {
    // ...
    metricRequestCounter?.inc();
    // ...
});
```

> Do not forget to install `pm2-prom-module` to your PM2.
