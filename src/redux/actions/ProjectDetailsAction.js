import store from '../store/store';

class ProjectDetailsAction {

    getDetails(project){
        store.dispatch({type:'CatchProjectDetails', data:project});
    }
}

export default new ProjectDetailsAction();