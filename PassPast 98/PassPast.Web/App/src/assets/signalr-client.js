(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.signalR = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./Transports", "./HttpClient"], function (require, exports) {
    "use strict";
    const Transports_1 = require("./Transports");
    const HttpClient_1 = require("./HttpClient");
    var ConnectionState;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["Disconnected"] = 0] = "Disconnected";
        ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
        ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    })(ConnectionState || (ConnectionState = {}));
    class Connection {
        constructor(url, queryString = "") {
            this.dataReceivedCallback = (data) => { };
            this.connectionClosedCallback = (error) => { };
            this.url = url;
            this.queryString = queryString;
            this.connectionState = ConnectionState.Disconnected;
        }
        start(accessToken, transportName = 'webSockets') {
            if (this.connectionState != ConnectionState.Disconnected) {
                throw new Error("Cannot start a connection that is not in the 'Disconnected' state");
            }
            this.transport = this.createTransport(transportName);
            this.transport.onDataReceived = this.dataReceivedCallback;
            this.transport.onError = e => this.stopConnection();
            return new HttpClient_1.HttpClient().get(`${this.url}/getid?${this.queryString}`)
                .then(connectionId => {
                this.connectionId = connectionId;
                this.queryString = `id=${connectionId}&${this.connectionId}` + "&access_token=Bearer " + accessToken;
                return this.transport.connect(this.url, this.queryString);
            })
                .then(() => {
                this.connectionState = ConnectionState.Connected;
            })
                .catch(e => {
                console.log("Failed to start the connection.");
                this.connectionState = ConnectionState.Disconnected;
                this.transport = null;
                throw e;
            });
        }
        createTransport(transportName) {
            if (transportName === 'webSockets') {
                return new Transports_1.WebSocketTransport();
            }
            if (transportName === 'serverSentEvents') {
                return new Transports_1.ServerSentEventsTransport();
            }
            if (transportName === 'longPolling') {
                return new Transports_1.LongPollingTransport();
            }
            throw new Error("No valid transports requested.");
        }
        send(data) {
            if (this.connectionState != ConnectionState.Connected) {
                throw new Error("Cannot send data if the connection is not in the 'Connected' State");
            }
            return this.transport.send(data);
        }
        stop() {
            if (this.connectionState != ConnectionState.Connected) {
                throw new Error("Cannot stop the connection if it is not in the 'Connected' State");
            }
            this.stopConnection();
        }
        stopConnection(error) {
            this.transport.stop();
            this.transport = null;
            this.connectionState = ConnectionState.Disconnected;
            this.connectionClosedCallback(error);
        }
        set dataReceived(callback) {
            this.dataReceivedCallback = callback;
        }
        set connectionClosed(callback) {
            this.connectionClosedCallback = callback;
        }
    }
    exports.Connection = Connection;
});

},{"./HttpClient":2,"./Transports":4}],2:[function(require,module,exports){
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    class HttpClient {
        get(url) {
            return this.xhr("GET", url);
        }
        post(url, content) {
            return this.xhr("POST", url, content);
        }
        xhr(method, url, content) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                if (method === "POST" && content != null) {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
                xhr.send(content);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    }
                    else {
                        reject({
                            status: xhr.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = () => {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                };
            });
        }
    }
    exports.HttpClient = HttpClient;
});

},{}],3:[function(require,module,exports){
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./Connection"], function (require, exports) {
    "use strict";
    const Connection_1 = require("./Connection");
    class HubConnection {
        constructor(url, queryString) {
            this.connection = new Connection_1.Connection(url, queryString);
            let thisHubConnection = this;
            this.connection.dataReceived = data => {
                thisHubConnection.dataReceived(data);
            };
            this.callbacks = new Map();
            this.methods = new Map();
            this.id = 0;
        }
        dataReceived(data) {
            //TODO: separate JSON parsing
            var descriptor = JSON.parse(data);
            if (descriptor.Method === undefined) {
                let invocationResult = descriptor;
                let callback = this.callbacks[invocationResult.Id];
                if (callback != null) {
                    callback(invocationResult);
                    this.callbacks.delete(invocationResult.Id);
                }
            }
            else {
                let invocation = descriptor;
                let method = this.methods[invocation.Method];
                if (method != null) {
                    // TODO: bind? args?
                    method.apply(this, invocation.Arguments);
                }
            }
        }
        start(transportName) {
            return this.connection.start(transportName);
        }
        stop() {
            return this.connection.stop();
        }
        invoke(methodName, ...args) {
            let id = this.id;
            this.id++;
            let invocationDescriptor = {
                "Id": id.toString(),
                "Method": methodName,
                "Arguments": args
            };
            let p = new Promise((resolve, reject) => {
                this.callbacks[id] = (invocationResult) => {
                    if (invocationResult.Error != null) {
                        reject(invocationResult.Error);
                    }
                    else {
                        resolve(invocationResult.Result);
                    }
                };
                //TODO: separate conversion to enable different data formats
                this.connection.send(JSON.stringify(invocationDescriptor))
                    .catch(e => {
                    // TODO: remove callback
                    reject(e);
                });
            });
            return p;
        }
        on(methodName, method) {
            this.methods[methodName] = method;
        }
        set connectionClosed(callback) {
            this.connection.connectionClosed = callback;
        }
    }
    exports.HubConnection = HubConnection;
});

},{"./Connection":1}],4:[function(require,module,exports){
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./HttpClient"], function (require, exports) {
    "use strict";
    const HttpClient_1 = require("./HttpClient");
    class WebSocketTransport {
        connect(url, queryString = "") {
            return new Promise((resolve, reject) => {
                url = url.replace(/^http/, "ws");
                let connectUrl = url + "/ws?" + queryString;
                let webSocket = new WebSocket(connectUrl);
                let thisWebSocketTransport = this;
                webSocket.onopen = (event) => {
                    console.log(`WebSocket connected to ${connectUrl}`);
                    thisWebSocketTransport.webSocket = webSocket;
                    resolve();
                };
                webSocket.onerror = (event) => {
                    reject();
                };
                webSocket.onmessage = (message) => {
                    console.log(`(WebSockets transport) data received: ${message.data}`);
                    if (thisWebSocketTransport.onDataReceived) {
                        thisWebSocketTransport.onDataReceived(message.data);
                    }
                };
                webSocket.onclose = (event) => {
                    // webSocket will be null if the transport did not start successfully
                    if (thisWebSocketTransport.webSocket && event.wasClean === false) {
                        if (thisWebSocketTransport.onError) {
                            thisWebSocketTransport.onError(event);
                        }
                    }
                };
            });
        }
        send(data) {
            if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
                this.webSocket.send(data);
                return Promise.resolve();
            }
            return Promise.reject("WebSocket is not in OPEN state");
        }
        stop() {
            if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = null;
            }
        }
    }
    exports.WebSocketTransport = WebSocketTransport;
    class ServerSentEventsTransport {
        connect(url, queryString) {
            if (typeof (EventSource) === "undefined") {
                Promise.reject("EventSource not supported by the browser.");
            }
            this.queryString = queryString;
            this.url = url;
            let tmp = `${this.url}/sse?${this.queryString}`;
            return new Promise((resolve, reject) => {
                let eventSource = new EventSource(`${this.url}/sse?${this.queryString}`);
                try {
                    let thisEventSourceTransport = this;
                    eventSource.onmessage = (e) => {
                        if (thisEventSourceTransport.onDataReceived) {
                            thisEventSourceTransport.onDataReceived(e.data);
                        }
                    };
                    eventSource.onerror = (e) => {
                        reject();
                        // don't report an error if the transport did not start successfully
                        if (thisEventSourceTransport.eventSource && thisEventSourceTransport.onError) {
                            thisEventSourceTransport.onError(e);
                        }
                    };
                    eventSource.onopen = () => {
                        thisEventSourceTransport.eventSource = eventSource;
                        resolve();
                    };
                }
                catch (e) {
                    return Promise.reject(e);
                }
            });
        }
        send(data) {
            return new HttpClient_1.HttpClient().post(this.url + "/send?" + this.queryString, data);
        }
        stop() {
            if (this.eventSource) {
                this.eventSource.close();
                this.eventSource = null;
            }
        }
    }
    exports.ServerSentEventsTransport = ServerSentEventsTransport;
    class LongPollingTransport {
        connect(url, queryString) {
            this.url = url;
            this.queryString = queryString;
            this.poll(url + "/poll?" + this.queryString);
            return Promise.resolve();
        }
        poll(url) {
            let thisLongPollingTransport = this;
            let pollXhr = new XMLHttpRequest();
            pollXhr.onload = () => {
                if (pollXhr.status == 200) {
                    if (thisLongPollingTransport.onDataReceived) {
                        thisLongPollingTransport.onDataReceived(pollXhr.response);
                    }
                    thisLongPollingTransport.poll(url);
                }
                else if (this.pollXhr.status == 204) {
                }
                else {
                    if (thisLongPollingTransport.onError) {
                        thisLongPollingTransport.onError({
                            status: pollXhr.status,
                            statusText: pollXhr.statusText
                        });
                    }
                }
            };
            pollXhr.onerror = () => {
                if (thisLongPollingTransport.onError) {
                    thisLongPollingTransport.onError({
                        status: pollXhr.status,
                        statusText: pollXhr.statusText
                    });
                }
            };
            pollXhr.ontimeout = () => {
                thisLongPollingTransport.poll(url);
            };
            this.pollXhr = pollXhr;
            this.pollXhr.open("GET", url, true);
            // TODO: consider making timeout configurable
            this.pollXhr.timeout = 110000;
            this.pollXhr.send();
        }
        send(data) {
            return new HttpClient_1.HttpClient().post(this.url + "/send?" + this.queryString, data);
        }
        stop() {
            if (this.pollXhr) {
                this.pollXhr.abort();
                this.pollXhr = null;
            }
        }
    }
    exports.LongPollingTransport = LongPollingTransport;
});

},{"./HttpClient":2}]},{},[3])(3)
});
