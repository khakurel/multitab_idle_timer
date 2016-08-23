/**
 * Simple Event Emitter
 * to bind or emit an event
 *
 */
export class EventEmitter {

    constructor() {
        this._listeners = {};
    }

    /**
     * check if event is an Object
     * @param event
     * @returns {boolean}
     */
    isObject(event) {
        return toString.call(this._listeners[event]) === '[object Object]';
    }

    /**
     * bind event to a listener
     * @param event
     * @param listener
     * @returns {EventEmitter}
     */
    on(event, listener) {
        if (!this.isObject(event)) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(listener);
        return this;
    }


    /**
     * Emit an events with args
     * @param event
     * @param args
     */
    emit(event, ...args) {
        let i, listeners, length;

        if (this.isObject(event)) {
            listeners = this._listeners[event].slice();
            length = listeners.length;

            for (i = 0; i < length; i++) {
                listeners[i].apply(this, args);
            }
        }
    }


    once(event, listener) {
        this.on(event, callback => {
            this.removeListener(event, callback);
            listener.apply(this, arguments);
        })
    }

    removeListener(event, listener) {
        let idx;

        if (this.isObject(event)) {
            idx = this.events[event].findIndex(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    static addEvent(element, event, fn) {
        if (element.addEventListener) {
            element.addEventListener(event, fn, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + event, fn);
        }
    }

    static removeEvent(element, event, fn) {
        if (element.removeEventListener) {
            element.removeEventListener(event, fn, false);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + event, fn);
        }
    }


}
