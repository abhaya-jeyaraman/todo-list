import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';
import BucketName from './BucketName';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './TodoList.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: ''
    }
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }
  renderItems() {
    const bucketName = this.props.activeBucket;
    if (bucketName != '') {
      var selectedBucket = this.props.listState.filter(function (bucket) {
        return bucketName === bucket.name
      });
      var items = selectedBucket[0].items;
      console.log(selectedBucket[0]);
      if (items.length == 0) return <p className='emptyText'> Humpty Dumpty - Todo list is empty </p>
      else {
        return items.map((item) =>
          <ListItem
            key={item.itemName}
            itemName={item.itemName}
            itemState={item.isCompleted} />);
      }
    }
    else {
      return <p className='emptyText'> Create the bucket first before adding the list </p>
    }
  }

  handleNewItem(event) {
    this.setState({ newItem: event.target.value });
  }
  handleEnter(event) {
    if (event.keyCode === 13) {
      // var item = [];
      // item.push(this.state.newItem);
      // this.setState({items: item.concat(this.state.items)});
      this.props.dispatch({
        type: 'ADD_ITEM',
        itemName: this.state.newItem,
        bucketName: this.props.activeBucket
      })
      this.setState({ newItem: '' });
    }
  }
  handleBack() {
    this.props.history.push('/');
  }
  render() {
    const name = this.props.activeBucket;
    return (
      <div className='todoList'>
        <div className='bucketName'>
          <BucketName name={name} />
        </div>
        <div className='listControl'>
          <input
            type='input'
            placeholder='Enter an item name and press enter to add'
            className='styledInput'
            value={this.state.newItem}
            onChange={this.handleNewItem}
            onKeyDown={this.handleEnter}
          />
          <div className='listItems'>
            {this.renderItems()}
          </div>
        </div>
        <div onClick={this.handleBack}>
          <p className='backLink'> Back to list  </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    listState: state.bucketList,
    activeBucket: state.activeBucketName
  }
}

export default connect(mapStateToProps)(withRouter(TodoList));
