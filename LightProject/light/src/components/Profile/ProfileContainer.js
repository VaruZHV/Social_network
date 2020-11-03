import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  OnPostSend,
  setUser,
  toggleIsFetching,
  onFollow,
  onUnFollow,
  followThunk,
  unFollowThunk,
  getUserThunk,
  setStatusThunk,
  savePhotoThunk,
} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import AuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.Id;
    if (!userId) {
      userId = this.props.autohraizedUserId;
      if (!userId) {
        this.props.history.push('login');
      }
    }

    this.props.getUserThunk(userId);
  }
  render() {
    return <Profile {...this.props} isOwner={!this.props.match.params.Id} />;
  }
}

let MapStateToProps = (state) => {
  return {
    ProfilePage: state.ProfilePage,
    autohraizedUserId: state.auth.id,
  };
};

export default compose(
  connect(MapStateToProps, {
    onFollow,
    onUnFollow,
    OnPostSend,
    toggleIsFetching,
    setUser,
    followThunk,
    unFollowThunk,
    getUserThunk,
    setStatusThunk,
    savePhotoThunk,
  }),
  withRouter,
  AuthRedirect
)(ProfileContainer);
