import store from '../store/store';
import axios from 'axios';

class EventsAction {
    getEventsList() {
        axios.get('./endpoints/events.json')
            .then((response) => {
                store.dispatch({type: 'EventsList', data:response.data});
                console.log('EventsResponse==',response);
            })
            .catch((err) => {
                store.dispatch({type: 'EventsError'});
            })
    }

    sortEvents() {
        axios.get('./endpoints/events.json')
            .then((response) => {
                var i, j;
                var data = response.data;
                const dataLength = data.length();
                for (i = 1; i<dataLength; i++) {
                    for(j=0; j<i; j++)
                    {
                        const a = data[i];
                        const b = data[j];
                        if (this._compare(a,b)) {
                            data[j] = a;
                            data[i]= b;
                        }
                    }


                }
            })
    }

    _compare(a,b) {
        if (a < b) {
            return true;
        }
        else {
            return false;
        }

    }
}

export default new EventsAction();