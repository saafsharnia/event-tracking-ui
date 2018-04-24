import store from '../store/store';
import axios from 'axios';

class ProjectsAction {

    getProjectsList() {
        axios.get('/endpoints/projects.json')
            .then((response) => {
                store.dispatch({type: 'ProjectsList', data: response.data});
            })
            .catch((err) => {
                store.dispatch({type: 'ProjectsError'});
            })
    }

    sortProjects(sort) {
        axios.get('/endpoints/projects.json')
            .then((response) => {
                var i, j;
                var data = response.data;
                const dataLength = data.length;
                for (i = 1; i<dataLength; i++) {
                    for(j=0; j<i; j++)
                    {
                        const a = data[i];
                        const b = data[j];
                        if(sort === 'Descending sort') {
                            if (a.title < b.title) {
                                data[j] = a;
                                data[i]= b;
                            }
                        }
                        else {
                            if (a.title > b.title) {
                                data[j] = a;
                                data[i]= b;
                            }
                        }
                    }
                }
                store.dispatch({type:'ProjectsList', data: data});
            });
    }
}

export default new ProjectsAction();