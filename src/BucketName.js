import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './BucketName.css'

class BucketName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bucketName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  handleChange(event) {
    this.setState({ bucketName: event.target.value });
  }
  handleEnter(event) {
    if (event.keyCode === 13) {
      if (this.state.bucketName != '') {
        this.props.dispatch({
          'type': 'ADD_NEW_BUCKET',
          'name': this.state.bucketName
        })
        this.props.dispatch({
          type: 'CHANGE_ACTIVE_BUCKET',
          name: this.state.bucketName
        })
      }
    }
  }
  clickHandler() {
    this.setState({ isEditable: 1 });
  }
  renderField() {
    if (!this.props.name) {
      return (
        <input
          type='input'
          placeholder='Add name and hit ENTER'
          className='nameInput'
          onChange={this.handleChange}
          onKeyDown={this.handleEnter}
          value={this.state.bucketName}
        />
      )
    }
    else return (
      <div className='editedName'>
        <h1> {this.props.name} </h1>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderField()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(BucketName);
