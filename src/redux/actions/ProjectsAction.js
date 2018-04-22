import store from '../store/store';
import axios from 'axios';

class ProjectsAction {

    getProjectsList() {
        axios.get('/endpoints/projects.json')
            .then((response) => {
                console.log('ProjectsResponse before dispatch==',response);
                store.dispatch({type: 'ProjectsList', data: response.data});
            })
            .catch((err) => {
                store.dispatch({type: 'ProjectsError'});
            })
    }

    sortProjects() {
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
                        if (a.title < b.title) {
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

export default new ProjectsAction();