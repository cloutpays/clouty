import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FNAME: '',
      EMAIL: '',
      CITY: '',
      HANDLE: '',
      SONG: '',
      SELECTED_SONG: '',
      ARTIST: 'Not set yet',
      SONGS: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}

  renderSongs() {
    var songRender = [];
    for (var track in this.state.SONGS) {
      var artist = this.state.SONGS[track]['artist'];
      var song = this.state.SONGS[track]['song'];
      songRender.push(artist + ' - ' + song);
    }
    return songRender;
  }
  handleChange(e) {
    console.log(e);
    if (e.target.name == 'FNAME')
      this.setState({ FNAME: e.target.value }, () => {
        console.log(this.state.FNAME);
      });
    if (e.target.name == 'CITY')
      this.setState({ CITY: e.target.value }, () => {
        console.log(this.state.CITY);
      });
    if (e.target.name == 'EMAIL')
      this.setState({ EMAIL: e.target.value }, () => {
        console.log(this.state.EMAIL);
      });
    if (e.target.name == 'HANDLE')
      this.setState({ HANDLE: e.target.value }, () => {
        console.log(this.state.HANDLE);
      });
    if (e.target.name == 'SONG')
      this.setState(
        {
          SONG: e.target.value,
          SELECTED_SONG: e.target.value.split(' - ')[1],
          ARTIST: e.target.value.split(' - ')[0],
        },
        () => {
          console.log(this.state.SONG);
        },
      );
  }
  async handleSubmit(e) {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/create',
      data: {
        artist: this.state.ARTIST,
        song: this.state.SONG,
        email: this.state.EMAIL,
        song: this.state.SELECTED_SONG,
        firstName: this.state.FNAME,
        city: this.state.CITY,
        handle: this.state.HANDLE,
      },
    })
      .then(res => {
        console.log('RESPONSE RECEIVED: ', res);
        window.location.href = '/songconfirm';
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
        window.location.href = '/signup';
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <a className="card">
            <h3>Game #1 &rarr;</h3>
            <p>
              The Game and Fab drop Nov.29th w/ 'Born 2 Rap and 'SS3'. Who will
              sell more in the first week?
            </p>
            <br />
            <form>
              {/* <label for="game1">Choose an artist:</label> */}
              <select>
                <option value="">--Please choose an artist--</option>
                <option value="The Game">The Game</option>
                <option value="Fabolous">Fabolous</option>
              </select>
            </form>
          </a>
          <a className="card">
            <h3>Game #2 &rarr;</h3>
            <p>
              Larry June has dropped five projects in 2019. Will he close out
              2019 with a 6th?
            </p>
            <br />
            <form>
              {/* <label for="game1">Choose an artist:</label> */}
              <select>
                <option value="">--Yes or No--</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </form>
          </a>
          <a className="card">
            <h3>Game #3 &rarr;</h3>
            <p>Who gonna have the next banger? Pop Smoke or Fivio Foreign</p>
            <br />
            <form>
              {/* <label for="game1">Choose an artist:</label> */}
              <select>
                <option value="">--Please choose an artist--</option>
                <option value="Fivio Foreign">Fivio Foreign</option>
                <option value="Pop Smoke">Pop Smoke</option>
              </select>
            </form>
          </a>
        </div>

        <div className="about">
          <form className="rsvp-form">
            <div className="rsvp-form">
              <label for="name">Name: </label>
              <br></br>
              <input
                className="signup-input"
                type="text"
                value={this.state.FNAME}
                onChange={this.handleChange}
                name="FNAME"
                id="name"
                required
              />
            </div>
            <br></br>
            <div className="rsvp-form">
              <label for="email">Email Address: </label>
              <br></br>
              <input
                className="signup-input"
                type="email"
                value={this.state.EMAIL}
                onChange={this.handleChange}
                name="EMAIL"
                id="email"
                required
              />
            </div>

            <br></br>
            <div className="rsvp-form">
              <label for="name">Where You From?: </label>
              <br></br>
              <input
                className="signup-input"
                type="text"
                value={this.state.CITY}
                onChange={this.handleChange}
                name="CITY"
                id="city"
                required
              />
            </div>
            <br></br>
            <div className="rsvp-form">
              <label for="email">IG or Twitter @: </label>
              <br></br>
              <input
                className="signup-input"
                type="text"
                value={this.state.HANDLE}
                onChange={this.handleChange}
                name="HANDLE"
                id="handle"
              />
            </div>
            <br></br>
            <div className="rsvp-form">
              <label for="name">Place your bet </label>
              <br></br>
              <select
                value={this.state.SONG}
                name="SONG"
                id="name"
                onChange={this.handleChange}
              >
                <option value="idk">Select Song</option>
              </select>
              {/* <input className="signup-input" type="text" onChange={this.handleChange} name="SONG" id="name" required/> */}
            </div>
            <br></br>
            <button
              onClick={this.handleSubmit}
              className="btn btn--right btn--tickets"
            >
              SIGN UP
            </button>
          </form>
        </div>
        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}
export default SignUpForm;
