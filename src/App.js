import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [utilityState, setUtilityState] = React.useState({
    lookupActive: false,
    isResultAvailable: false,
    navigatable: false,
    more: true
  });

  const activateLookupView = () => setUtilityState(prevUtilityState => ({
    ...prevUtilityState,
    lookupActive: !prevUtilityState.lookupActive
  }));

  const changeResultReady = () => setUtilityState(prevUtilityState => ({
    ...prevUtilityState,
    isResultAvailable: !prevUtilityState.isResultAvailable,
    more: true
  }))

  const toggleNavigation = () => setUtilityState(prevUtilityState => ({
    ...prevUtilityState,
    navigatable: !prevUtilityState.navigatable,
  }))

  const toggleMore = (flag) => setUtilityState(prevUtilityState => ({
    ...prevUtilityState,
    more: flag
  }))

  return (
    <div className="App">
      <Header
        lookupActive={utilityState.lookupActive}
        lookupView={activateLookupView}
      />
      <Main
        {...utilityState}
        changeResultReady={changeResultReady}
        toggleNavigation={toggleNavigation}
        toggleMore={toggleMore}
      />
    </div>
  );
}

export default App;
