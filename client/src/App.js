import './App.css';
import Dashboard from './Dashboard';
import MyNavbar from './MyNavbar';
import MemeGenerating from './MemeGenerating';
import LoginForm from './Login';
import MyMemes from './MyMemes';
import API from './api/API';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useState, useEffect} from 'react';
import PageNotFound from './PageNotFound';

import templatememes from './template/Template_Array';

function App() {

  const [memes,setMemes] = useState([]); //the array of meme to display in the dashboard
  const [mymemes,setMymemes] = useState([]); //the array of all memes of one creator
  const [dirty, setDirty] = useState(true); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userInfo, setUserInfo] = useState(''); //getting the username
  const [loading, setLoading] = useState(false);
  
  const routerHistory = useHistory();

  useEffect(() => {
    API.getUserInfo().then((user) => {
      setUserInfo(user.name);
      setUserid(user.id);
      setLoggedIn(true);
      setLoading(true);
      setDirty(true);
    }).catch((err) => console.log(err));
  }, []);

  const doLogIn = (username, password) => {
    API.logIn(username, password).then(([name,id]) => {
      setUserInfo(name);
      setUserid(id);
      setLoggedIn(true);
      setDirty(true);
      setLoading(true);
      routerHistory.push('/');
    }).catch((err) => {
      console.log(err);
    });
    
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUserInfo('');
      setUserid('');
      routerHistory.push('/');
      window.location.reload(); //refresh the homepage
    }).catch((err) => console.log(err));
  };

   // Rehydrate meme at mount time when user is not logged in
   useEffect(()=>{
    API.loadAllPublicMemes().then((newM) => {setMemes(newM);});
  }, []);
  
  // Rehydrate meme when user is logged in
  useEffect(()=>{
    if(loggedIn && dirty){
      API.loadAllMemes().then((newM) => {
        setMemes(newM);
        setDirty(false);
        setLoading(false);
      }); //all meme
      API.getAllMemeUser().then((newM) => {
        setMymemes(newM);
        setDirty(false);
        setLoading(false);
        }); //all meme of a single user
    }
  }, [dirty,loggedIn]);
    




  const addMeme = (meme) => {
    setMemes((oldMemes) => [...oldMemes, meme]);
    API.addNewMeme(meme)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };

  const deleteMeme = (id) => {
    setMemes((currMemes) => currMemes.filter((mms) => (mms.id !== id)));
    API.deleteMeme(id)
      .then(setDirty(true))
      .catch((err) => console.log(err));
  };
 
  return (
    <>
      <MyNavbar loggedIn={loggedIn} doLogOut={doLogOut}/>
      <div>
        <Switch>
          <Route exact path="/">
            {loading ? <div><h1 style={{textAlign: 'center'}}>🕗 Please wait, loading memes... </h1></div> : (
              <Dashboard
              memes={memes}
              loggedIn={loggedIn}
             />
            )}
          </Route>
          {loggedIn ? (
            ''
          ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn}/>
        </Route>) }
        {loggedIn ? 
            (
          <Route path="/MemeGenerating">
            <MemeGenerating
            loggedIn={loggedIn}
            templatememes={templatememes}
            addMeme={addMeme}
            userInfo={userInfo}
            userid={userid}
           
            />
            </Route>
            ) : (<PageNotFound/>)}

          <Route exact path="/MyMemes">
            {loggedIn ? (<MyMemes mymemes={mymemes} deleteMeme={deleteMeme}/> 
            ) : (<PageNotFound/>)}
          </Route>
          <Route>
            <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
