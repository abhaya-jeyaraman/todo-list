import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './ListItem.css';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: 0
    }
    this.changeState = this.changeState.bind(this);
  }
  returnClass() {
    return (this.props.itemState) ? 'completedText' : 'activeText';
  }
  changeState(event) {
    var newState = this.props.itemState ? 0 : 1;
    this.props.dispatch({
      'type': 'CHANGE_ITEM_STATE',
      'itemName': this.props.itemName,
      'newState': newState
    });
    //this.setState({ isCompleted: newState });
  }
  render() {
    return (
      <div className='listItem'>
        <input type='checkbox' key={this.props.itemName} checked={this.props.itemState} onChange={this.changeState} />
        <p className={this.returnClass()}> {this.props.itemName} </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeBucket: state.activeBucketName
  }
}

export default connect(mapStateToProps)(ListItem);
