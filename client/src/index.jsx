import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import StarIcon from './components/StarIcon.jsx';
import SuperhostIcon from './components/SuperhostIcon.jsx';
import SuperhostBadge from './components/SuperhostBadge.jsx';
import VerifiedIcon from './components/VerfiedIcon.jsx';
import PaymentProtectionIcon from './components/PaymentProtectionIcon.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: '',
      dateJoined: '',
      hostDescription: '',
      isSuperhost: '',
      isVerified: '',
      profilePic: '',
      reviewCount: 0
    };
  }

  componentDidMount() {
    this.getHost();
  }

  getHost() {
    let url = window.location.href;
    let listingID = url.split('/')[3];

    $.ajax({
      url: `/${listingID}/host`,
      type: 'GET',
      success: (res) => {
        console.log(res);
        this.setState({
          hostName: res[0].hostName,
          dateJoined: res[0].dateJoined,
          hostDescription: res[0].hostDescription,
          isSuperhost: res[0].isSuperhost,
          isVerified: res[0].isVerified,
          profilePic: res[0].profilePic,
          reviewCount: res[0].reviewCount
        });
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }


  render() {
    return (
      <div className="App" style={{
        height: '100%',
        paddingTop: '48px',
        paddingLeft: '40px',
        paddingRight: '40px',
        maxWidth: '1280px',
        minWidth: '744px',
        marginLeft: '10%',
        marginRight: '10%'
      }}>
        <div style={{display: 'inline-flex'}}>
          <img style={{
            borderRadius: '56%',
            height: '64px',
            width: '64px',
            background: 'white',
            display: 'inline-block',
            position: 'absolute'
          }}
          src={this.state.profilePic}/>
          <div style={{marginTop: '3%', marginLeft: '70px', marginBottom: '25px'}}>
            <HostNameStyle>{'Hosted by ' + this.state.hostName}</HostNameStyle>
            <HostJoinedDateStyle>{'Joined in ' + this.state.dateJoined}</HostJoinedDateStyle>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div>
            <div style={{display: 'inline-flex', width: '100%', boxSizing: 'content-box'}}>
              <StarIcon />
              <HostReviews>{this.state.reviewCount + ' Reviews'}</HostReviews>
              {!this.state.isVerified ? <div style={{display: 'flex'}}><VerifiedIcon/> <HostVerified>Identity Verified</HostVerified></div> : null}
              {this.state.isSuperhost ? <div style={{display: 'flex'}}><SuperhostIcon/> <HostSuperhost>Superhost</HostSuperhost></div> : null}
            </div>
            <HostDescriptionStyle>{this.state.hostDescription}</HostDescriptionStyle>
            {this.state.isSuperhost ?
              <div>
                <SuperhostTitle>
                  {this.state.hostName + 'is a Superhost'}
                </SuperhostTitle>
                <SuperhostDescription>
                  {'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.'}
                </SuperhostDescription>
              </div>
              : null}
          </div>
          <div style={{boxSizing: 'content-box', width: '100%', marginRight: '10%'}}>
            <HostDescriptionStyle>Response rate: 100%</HostDescriptionStyle>
            <HostDescriptionStyle>Response time: within an hour</HostDescriptionStyle>
            <ContactHostButton>Contact Host</ContactHostButton>
            <div style={{display: 'inline-flex', marginTop: '24px'}}>
              <PaymentProtectionIcon />
              <PaymentProtectionMessage>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</PaymentProtectionMessage>
            </div>
          </div>
        </div>
        <div style={{borderBottomWidth: '1px', borderBottomStyle: 'solid', color: '#DDDDDD', paddingTop: '48px'}}></div>
      </div>
    );
  }
}

const HostNameStyle = styled.div`
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 6px;
`;
const HostJoinedDateStyle = styled.div `
  color: rgb(113, 113, 113);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const HostDescriptionStyle = styled.div `
  color: var(--html-text-color, #222222);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  margin-top: 15px;
  padding-right: 19%;
  width: 60%;
  white-space: pre-wrap;
`;

const HostReviews = styled.div `
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;
`;

const HostVerified = styled.div `
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;
`;

const HostSuperhost = styled.div `
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;
`;

const SuperhostTitle = styled.div `
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-top: 25px;
`;

const SuperhostDescription = styled.div `
  color: var(--html-text-color, #222222);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  margin-top: 5px;
  padding-right: 19%;
  width: 60%;
  white-space: pre-wrap;
}
`;

const ContactHostButton = styled.button `
  cursor: pointer;
  display: inline-block;
  margin-top: 8%;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: auto;
  touch-action: manipulation;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  outline: none;
  padding: 13px 23px;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s;
  border-color: rgb(34, 34, 34);
  background: rgb(255, 255, 255);
  color: rgb(34, 34, 34)
`;

const PaymentProtectionMessage = styled.div `
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  width: 60%
`;



ReactDOM.render(<App />, document.getElementById('Host'));