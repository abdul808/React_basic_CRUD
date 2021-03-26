import server from "../apis/server";
import history from '../history';

export const signIn = (UserId) =>{
    return{
        type:'SIGNED_IN',
        payload:UserId
    };
};

export const signOut = () =>{
    return{
        type:'SIGNED_OUT'
    };
};

export const createStream = formValues =>async (dispatch,getState) => {
  const {userId} = getState().auth;
   const response = await server.post('/streams', {...formValues , userId});
   dispatch({ type : 'CREATE_STREAM' , payload : response.data})
   history.push('/')
  }
 
  export const fetchStreams = () => async dispatch => {
    const response = await server.get('/streams');

    dispatch({ type: 'FETCH_STREAMS', payload: response.data });
  };
  
  export const fetchStream = id => async dispatch => {
    const response = await server.get(`/streams/${id}`);
  
    dispatch({ type: 'FETCH_STREAM', payload: response.data });
  };
  
  export const editStream = (id, formValues) => async dispatch => {
    const response = await server.patch(`/streams/${id}`, formValues);
  
    dispatch({ type: 'EDIT_STREAM', payload: response.data });
    history.push('/')  
  };
  
  export const deleteStream = id => async dispatch => {
    await server.delete(`/streams/${id}`);
  
    dispatch({ type: 'DELETE_STREAM', payload: id });
    history.push('/'); 
  };
  