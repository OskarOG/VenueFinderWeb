import React, { Component } from 'react';
import './App.css';
import SearchField from '../Search/components/SearchField/SearchField.js'
import SavedEventList from '../SavedList/SavedEventList.js';
import schedule from './images/ic_date_range_black.png';
import Alert from '../Alerts/components/alert.js'

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      savedEvents: [],
      alertProps : {
        message : '',
        alertVisible: false
      }
    };

    this.removeEvent = this.removeEvent.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  removeEvent(event) {
    this.setState(prevState => ({
      savedEvents: prevState.savedEvents.filter(e => e !== event)
    }), function () {
      localStorage.setItem("LOCALSTORAGE_SAVED_EVENTS", JSON.stringify({
          events: this.state.savedEvents
        }));
      }
    );
  }

  showSavedList() {
    var savedEvents = JSON.parse(localStorage.getItem("LOCALSTORAGE_SAVED_EVENTS"));
    if (savedEvents != null) {
      this.setState({
        savedEvents: savedEvents.events
      });
    }
  }

  showAlert(text){
    var refThis = this;
    let alertProps = {...this.state.alertProps};
    alertProps.message = text;
    alertProps.alertVisible = true;
    this.setState({
      alertProps 
    });

    setTimeout(function(){
      alertProps.alertVisible = false;
      refThis.setState({
        alertProps
      })
    }, 5000);
  }

  render() {
    return (
      <div className="bmd-layout-container bmd-drawer-f-r bmd-drawer-overlay">     
      <Alert alert={this.state.alertProps}/>   
          <header className="bmd-layout-header">
            <div className="navbar navbar-light">
                <h2>VenueFinder</h2>
            </div>
          </header>
          <div id="dw-p2" className="bmd-layout-drawer bg-faded">
            <header>
              <a className="navbar-brand">Saved events</a>
            </header>
            <div id="saved-events-container">
              <SavedEventList remove={this.removeEvent} savedEvents={this.state.savedEvents} />
            </div>
          </div>
          <main className="bmd-layout-content">
            <div className="container">
                <div>
                  <SearchField showAlert={this.showAlert}/>
                </div>
        <div className="fab-button">
          <button type="button" data-toggle="drawer" data-target="#dw-p2" onClick={() => this.showSavedList()} className="btn btn-info bmd-btn-fab">
            <img src={schedule} style={{width: 30+'px'}} alt='S' />
          </button>
        </div>
            </div>
          </main>
        </div>
    );
  }
}

export default App;




