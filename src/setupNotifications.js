import { sanity } from './sanity';

async function setupNotifications() {
    //check to see if browser supports notifs
    if(!('Notification' in window)) {
        //early return if not
        return;
    }

    //check if the user denied notifications
    if(Notification.permission === 'denied') {
        //early return if so
        return
    };

    //Wait for the user to give notification permissions
    await new Promise(async (resolve)=> {
        if(Notification.permission === 'granted') {
            resolve();
        }
        const result = await Notification.requestPermission();

        if(result === 'granted') {
            resolve();
        }
    });

    const getMadLibCount = async () =>
        sanity.fetch(`count(*[_type == 'madLib'])`);

    let previous = await getMadLibCount();
    //setup interval to poll for new mad libs every minute
    setInterval(async () => {
        const current = await getMadLibCount();
        //the current count is greater than the previous, send a notification
        if(current > previous) {
            previous = current;
            new Notification("There's a new Mad Lib for you to try!");
        }
    }, 60 * 1000);
}

export default setupNotifications;