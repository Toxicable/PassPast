import 'core-js/es6';
import 'core-js/es7/reflect';
//import 'reflect-metadata';
require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
     //Production
} else {

    require('zone.js/dist/long-stack-trace-zone');
    Error['stackTraceLimit'] = Infinity;
}