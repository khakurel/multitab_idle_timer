# Multi Tabs IdleTimer


_Mutli Tabs idle Timer of Single Page Application_

_npm, Webpack, Bable, Karma, Chai, Sinon_


## Installation

```
npm install --save multitab_idle_timer
```


## API

```js
import {IdleTimer} from 'multitab_idle_timer'
const idleTimer = new IdleTimer({timeout: 5, warnBefore: 1, store: 'session' }); 
/* 
 timeout: in 5 minutes, 
 warnBefore: 1 minute,  It will trigger warn event one minute before expiration
 store: local | session, default is local
*/

idleTimer.init();// initialize timer 

idleTimer.on('active', (idleTimerObject)=>{
    //do some thing when page is active
});

idleTimer.on('idle', (idleTimerObject)=>{
    //do some thing when page is idel
});


idleTimer.on('visible', (idleTimerObject)=>{
    //do some thing when page is visbile 
});


idleTimer.on('hidden', (idleTimerObject)=>{
    //do some thing when page is hidden
});

idleTimer.on('warn', (idleTimerObject)=>{
    //do some thing when  event is warn
});

idleTimer.reset(); // reset timer

idleTimer.stop(); // stop timer
 
idleTimer.isExpired() // check if idle timer is expried useful when page is relaod  
 
 
```

## Run Test
```
npm run test [test is pending]
```

## License

MIT, see `LICENSE.md` for more information.