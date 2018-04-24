import store from '../store/store';
import axios from 'axios';

class EventsAction {

    getEventsList() {
        axios.get('/endpoints/events.json')
            .then((response) => {
                store.dispatch({type: 'EventsList', data: response.data});
            })
            .catch((err) => {
                store.dispatch({type: 'EventsError', data:err});
            });
    }

    sortEvents() {
        axios.get('/endpoints/events.json')
            .then((response) => {
                var i, j;
                var data = response.data;
                const dataLength = data.length;
                for (i = 1; i<dataLength; i++) {
                    for(j=0; j<i; j++)
                    {
                        const a = data[i];
                        const b = data[j];
                        if (a.title < b.title) {
                            data[j] = a;
                            data[i]= b;
                        }
                    }
                }

                console.log('data===', data);
                store.dispatch({type:'EventsList', data: data});
            });
    }

    getCurrentEvent() {
        axios.get('/endpoints/events/current_event.json')
        .then((response) => {
            store.dispatch({type:'CurrentEvent', data:response.data});
            }

        )
        .catch((err) => {
            store.dispatch({type: 'EventsError', data:err});
        });
    }
}

export default new EventsAction();