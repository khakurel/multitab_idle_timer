import {Store} from 'simple_localstorage_api';
import {EventEmitter} from './event_emitter';

export class IdleTimer extends EventEmitter {

    constructor(setting = {}) {
        super();
        this.heartbeat = setting.heartbeat || 500;
        this.setting = setting;
        this.warnBefore = (setting.warnBefore || 0) * 60000;
        this.timeOut = setting.timeout * 60000;
        this.events = 'click,mousemove,mouseenter,keydown,scroll,mousedown,touchmove,touchstart';
        this.visibilityEvents = 'visibilitychange,webkitvisibilitychange,mozvisibilitychange,msvisibilitychange';
        this.store = new Store(setting.store || 'local');
        this.visible = false;
        this._warned = false;
    }


    static now() {
        return new Date().getTime();
    }

    /**
     * Init Timer
     * @returns {IdleTimer}
     */
    init() {
        if (!this._init) {
            this.bindEvents();
            this.schedule();
            this._init = true;
        }
        return this;
    }

    schedule() {
        this.updateStore();
        this.setInterval();
    }

    /**
     * Check idle time every heartbeat
     */
    setInterval() {
        this.idleTimer = setInterval(() => this.check(), (this.heartbeat));
    }

    /**
     * Update Local storage with last activity value
     */
    updateStore() {
        this.store.insert('idleTimer', {lastActivity: IdleTimer.now()});
    }


    /**
     * reset Timer
     */
    reset() {
        if (this.idle) {
            this._call('Active');
            this.idle = false;
            this._warned = false;
        }
        clearInterval(this.idleTimer);
        this.schedule();
    }

    /**
     * check if timer is expired
     */
    check() {
        if (this.idle) {
            return;
        }
        if (this.isExpired()) {
            this.idle = true;
            this._call('Idle')
        }
    }

    /**
     * call callback function and trigger events
     * @param type
     * @private
     */
    _call(type) {
        const method = this.setting[`on${type}`];
        if (toString.call(method) === '[object Function]') {
            method.call();
        }
        this.emit(type.toLowerCase(), this);

    }

    stop() {
        clearInterval(this.idleTimer);
        this.clearEvents();
        this.store.clear('idleTimer');
        this._warned = false;
        this._init = false;
        return this;
    }


    isExpired() {
        const timeNow = IdleTimer.now(),
            timeout = this.store.find('idleTimer').lastActivity;
        const timeEscaped = (timeNow - timeout);


        if (this.setting.warnBefore) {
            const shouldWarn = (timeEscaped > (this.timeOut - this.warnBefore));
            if (!this._warned && shouldWarn) {
                this._call('warn');
            }
        }

        return timeEscaped > this.timeOut;
    }


    visibilityListener() {
        if (document.hidden || document.webkitHidden || document.mozHidden || document.msHidden) {
            if (this.visible) {
                this.visible = false;
                this._call('Hidden')
            }
        } else {
            if (!this.visible) {
                this.visible = true;
                this._call('Visible')
            }
        }
    }

    /**
     * bind Events
     */
    bindEvents() {
        this._boundReset = this.reset.bind(this);
        this._boundStore = this.updateStore.bind(this);
        this._boundVisbilty = this.visibilityListener.bind(this);

        this.events.split(',').forEach(event => EventEmitter.addEvent(window, event, this._boundReset));
        EventEmitter.addEvent(window, 'beforeunload', this._boundStore);
        this.visibilityEvents.split(',').forEach(event => EventEmitter.addEvent(window, event, this._boundVisbilty));

    }

    clearEvents() {
        this.events.split(',').forEach(event => EventEmitter.removeEvent(window, event, this._boundReset));
        EventEmitter.removeEvent(window, 'beforeunload', this._boundStore);
        this.visibilityEvents.split(',').forEach(event => EventEmitter.removeEvent(window, event, this._boundVisbilty));
    }


}