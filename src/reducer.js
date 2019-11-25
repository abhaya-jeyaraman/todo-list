const initialState = {
  bucketList: [
    {
      "name": "Bali",
      "items": [
        {
          "itemName": "Ubud",
          "isCompleted": 0
        },
        {
          "itemName": "Uluwatu",
          "isCompleted": 1
        },
        {
          "itemName": "Kuta",
          "isCompleted": 1
        }
      ]
    },
    {
      "name": "Jaipur",
      "items": [
        {
          "itemName": "Hawa Mahal",
          "isCompleted": 1
        },
        {
          "itemName": "Jantar Mantar",
          "isCompleted": 0
        },
        {
          "itemName": "Jal Mahal",
          "isCompleted": 0
        }
      ]
    }
  ],
  activeBucketName: ''
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('Attempting to insert ' + action.itemName + ' to ' + action.bucketName);
      var itemToAdd = {
        "itemName": action.itemName,
        "isCompleted": 0
      }
      var newState = Object.assign({}, state);
      for (var i = 0; i < newState.bucketList.length; i++) {
        if (newState.bucketList[i].name == action.bucketName) {
          newState.bucketList[i].items.push(itemToAdd);
          break;
        }
      }
      return newState;

    case 'CHANGE_ITEM_STATE':
      console.log('Attempting to change item state');
      var newState = JSON.parse(JSON.stringify(state));
      for (var i = 0; i < newState.bucketList.length; i++) {
        if (newState.bucketList[i].name == state.activeBucketName) {
          for (var j = 0; j < newState.bucketList[i].items.length; j++) {
            if (newState.bucketList[i].items[j].itemName == action.itemName) {
              console.log('Item found' + newState.bucketList[i].items[j].itemName);
              newState.bucketList[i].items[j].isCompleted = action.newState;
              break;
            }
          }
        }
      }
      return newState;

    case 'CHANGE_ACTIVE_BUCKET':
      console.log('Request to change active bucket to ' + action.name);
      return { ...state, activeBucketName: action.name };

    case 'ADD_NEW_BUCKET':
      console.log('Adding new bucket: ' + action.name);
      var newState = Object.assign({}, state);
      var itemToAdd = {
        "name": action.name,
        "items": []
      }
      newState.bucketList.push(itemToAdd);
      return newState;

    default:
      return state;
  }
}


export default reducer;
