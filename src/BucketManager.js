import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './BucketManager.css'


class BucketManager extends React.Component {
  constructor(props) {
    super(props);
    this.renderBucketList = this.renderBucketList.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.showBucket = this.showBucket.bind(this);
  }
  showBucket(bucket) {
    this.props.dispatch({
      'type': 'CHANGE_ACTIVE_BUCKET',
      'name': bucket.name
    });
    this.props.history.push({
      pathname: '/list',
      state: {
        bucketName: bucket.name,
        todoItems: bucket.items
      }
    });
  }
  renderBucketList() {
    return this.props.list.map((bucket) => {
      return (
        <div key={bucket.name} className='bucketBox' onClick={() => this.showBucket(bucket)}>
          <p className='bucketText'>{bucket.name}</p>;
        </div>
      )
    });
  }
  addBucket() {
    console.log('Add a bucket')
    this.props.dispatch({
      type: 'CHANGE_ACTIVE_BUCKET',
      name: ''
    })
    this.props.history.push('/list');
  }
  render() {
    return (
      <div className='bucketManager'>
        <h1> List of buckets </h1>
        <div className='boxList'>
          {this.renderBucketList()}
        </div>
        <input
          type='button'
          value='Add new bucket'
          className='addBucket'
          onClick={this.addBucket}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.bucketList
  }
}

export default connect(mapStateToProps)(withRouter(BucketManager));
