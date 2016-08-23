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
const idleTimer = new IdleTimer({timeout: 5 }) // timeout in 5 minutes

idleTimer.init() // initialize timer 

idleTimer.on('active', ()=>{
    //do some thing when page is active
});

idleTimer.on('idle', ()=>{
    //do some thing when page is idel
})


idleTimer.on('visible', ()=>{
    //do some thing when page is visbile 
});


idleTimer.on('hidden', ()=>{
    //do some thing when page is hidden
});

idleTimer.reset() // reset timer

idleTimer.stop() // stop timer
 
idleTimer.isExpired() // check if idle timer is expried useful when page is relaod  
 
 
```

## Run Test
```
npm run test [test is pending]
```

## License

MIT, see `LICENSE.md` for more information.