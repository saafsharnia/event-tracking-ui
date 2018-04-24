import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ProjectDetailsAction from '../redux/actions/ProjectDetailsAction'

export default connect( state => ({
    projectDetails: state.projectDetails
}))(class ProjectDetails extends Component{
        state = {
          like: false,
        commentSnackbar: false
        };

        render() {
            console.log('this.props.projectDetails',this.props.projectDetails);
            const project = this.props.projectDetails.data;
            const styles = this._style();
            return (
              <div>
                  <Card style={styles.card}>
                      <CardMedia
                        image = {project.image}
                        title = {project.tile+' image'}
                        style={styles.image}
                      />
                      <CardContent>
                          <Typography style={styles.header}>
                              {project.title}
                          </Typography>
                          <Typography component="p">
                              {project.description}
                          </Typography>
                          <Divider style={styles.divider}/>
                          <Typography style={styles.assignedUser}>
                              Assigned Users:
                          </Typography>
                          <Chip label={project.user.name}/>
                          <BottomNavigation showLabels
                                            onChange={this._onLikeClick.bind(this)}
                                            style={{width: '20px'}}>
                              <BottomNavigationAction label={this.state.like ? 'Unlike' : 'Like'}
                                                      icon={<ThumbUp />}
                                                      style={styles.likeButton}/>
                          </BottomNavigation>
                      </CardContent>
                      <CardActions>
                          <textarea rows="6" cols="65" style={{float:'left'}}>
                          </textarea>
                          <Button size="small" color="primary" variant="raised" onClick={this._onCommentClick.bind(this)}>
                              Comment
                          </Button>
                      </CardActions>
                      <Button size="small" color="secondary" variant="raised"
                              onClick={this._onBackClick.bind(this)}
                              style={styles.backButton}>
                          Back
                      </Button>
                  </Card>
                  <Snackbar
                      open={this.state.commentSnackbar}
                      message={<span id="message-id">Comment sent</span>}
                      action="undo"
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      autoHideDuration={4000}
                      action={[
                          <Button key="undo" color="secondary" size="small" onClick={this.__onSnackbarClose.bind(this)}>
                              UNDO
                          </Button>,
                          <IconButton
                              key="close"
                              aria-label="Close"
                              color="inherit"
                              // className={classes.close}
                              onClick={this.__onSnackbarClose.bind(this)}
                          >
                              <CloseIcon />
                          </IconButton>,
                      ]}
                      onClose={this.__onSnackbarClose.bind(this)}
                      style={styles.snackbar}
                  />
              </div>
            );
        }

        _onLikeClick() {
            const like = !this.state.like;
            this.setState({like});
        }

        _onCommentClick() {
            this.setState({commentSnackbar: true});
        }

        _onBackClick() {
            ProjectDetailsAction.discardDetails();
        }

        __onSnackbarClose() {
            this.setState({commentSnackbar: false});
        }

        _style() {
            return {
                card: {
                    width: window.screen.width > 600 ? '70%' : '100%',
                    marginLeft: window.screen.width > 600 ? '15%' : 0,
                    marginTop: window.screen.width > 600 ? '1%' : 0,
                    marginBottom: window.screen.width > 600 ? '1%' : 0
                },
                image: {
                    height: 450,
                    width: '100%'
                },
                header: {
                    fontSize: '25px',
                    marginBottom: '5px'
                },
                divider: {
                  margin: '10px'
                },
                assignedUser: {
                    fontWeight: 550
                },
                likeButton: {
                    color: this.state.like ? '#2196f3' : 'gray'
                },
                backButton: {
                  marginBottom: '5px',
                  marginLeft: '10px'
                },
                snackbar: {
                    width: 300
                }
            };
        }
})

