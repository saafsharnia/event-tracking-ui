import store from '../store/store';

class ProjectDetailsAction {

    getDetails(project ){
        store.dispatch({type:'CatchProjectDetails', data:project});
    }

    /*this is used to delete projectDetails data and get back to event's page*/
    discardDetails() {
        store.dispatch({type:'discardProject'});
    }
}

export default new ProjectDetailsAction();