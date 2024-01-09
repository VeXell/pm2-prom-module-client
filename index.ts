import process from 'process';
import type { Registry } from 'prom-client';

const EVENT_NAME_COLLECT = 'pm2-prom-module:collect';
const EVENT_NAME_METRICS = 'pm2-prom-module:metrics';

type IPacket = {
    topic?: string;
    data?: {
        pid: number;
        appName: string;
        instance: number;
    };
};

type PM2BusResponse = {
    topic: string;
    data: { metrics: any };
};

let inited = false;

export function initMetrics(registry: Registry) {
    if (inited) {
        return;
    }

    inited = true;

    process.on('message', async (packet: IPacket) => {
        if (packet.topic === EVENT_NAME_COLLECT && packet.data) {
            if (!process.send) {
                return;
            }

            try {
                const metrics = await registry.getMetricsAsJSON();
                const message: PM2BusResponse = {
                    topic: EVENT_NAME_METRICS,
                    data: {
                        metrics,
                    },
                };

                process.send(message);
            } catch (error) {
                console.error(error);
            }
        }
    });
}
