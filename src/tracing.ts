import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { api, NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { B3Propagator } from '@opentelemetry/propagator-b3';
// Don't forget to import the dotenv package!
import * as dotenv from 'dotenv';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';


const oltpExporter = new OTLPTraceExporter({
    url: `https://api.honeycomb.io/v1/traces`,
    headers: {
        'x-honeycomb-team': process.env.HONEYCOMB_API_KEY,
    },
});

const traceExporter = oltpExporter;
api.propagation.setGlobalPropagator(new B3Propagator());
export const otelSDK = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: `nestjs-otel`,
    }),
    spanProcessors: [new SimpleSpanProcessor(traceExporter), new SimpleSpanProcessor(new ConsoleSpanExporter())],

    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new NestInstrumentation(),
    ],
});

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            (err) => console.log('Error shutting down SDK', err),
        )
        .finally(() => process.exit(0));
});

