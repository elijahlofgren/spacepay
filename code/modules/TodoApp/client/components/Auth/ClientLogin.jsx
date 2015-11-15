import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import TodoHeader from '../../components/TodoHeader';
import TodoList from '../../components/TodoList';

import Tasks from '../../../collections/Tasks';

@ReactMixin.decorate(ReactMeteorData)
export default class ClientLogin extends Component {

  state = {
    hideCompleted: false
  }

  // TO DO: Remove this
  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    return (
        <div className="container">
            <Link to="/admin">Admin</Link>
            <form id="application-signup" className="signup">
              <h4 className="page-header">Account details</h4>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" className="form-control" 
                placeholder="Full Name" />
              </div> 
          
              <div className="form-group">
                <input type="submit" className="btn btn-success btn-block"
                 data-loading-text="Setting up your trial..."  
                 value="Put me on the rocketship" />
              </div> 
            </form>
        </div>
    );
  }
};
