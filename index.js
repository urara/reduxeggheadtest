const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state -1;
        default:
            return state;
    }
}

// ReduxのcreateStore自前実装したらこんな感じ
// const createStore = (reducer) => {
//     let state;
//     let listeners = [];
    
//     const getState = () => state;
    
//     const dispatch = (action) => {
//         state = reducer(state, action);
//         listeners.forEach(listener => listener());
//     };
    
//     // returnで返しているものはunsubscribeの代わりかな？基本的にはいらないかも
//     const subscribe = (listener) => {
//         listeners.push(listener);
        
//         //return () => {
//         //    listeners = listeners.filter(l => l !== listener);
//         //};
//     };
    
//     dispatch({});
    
//     return {getState, dispatch, subscribe};
// }

const Counter = ({
    value,
    onIncrement,
    onDecrement
    }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const { createStore } = Redux;

// storeはcreateStoreが返すfunction3つを持つオブジェクト
const store = createStore(counter);

const render = ()  => {
    ReactDOM.render(
        <Counter 
        value={store.getState()}
        onIncrement = {() => 
            store.dispatch({type:'INCREMENT'})
        }
        onDecrement = {() => 
            store.dispatch({type:'DECREMENT'})
        }
        
        />, 
        document.getElementById('root')
    );
}

store.subscribe(render);
render();

//コンソール実行
//store.dispatch({ type:'INCREMENT'});
//console.log(store.getState());

// react無し、reduxで画面書き変える場合
// store.subscribe(() => {
//     document.body.innerText = store.getState();
// });

// document.addEventListener('click', () => {
//     store.dispatch({type: 'INCREMENT'});
// });