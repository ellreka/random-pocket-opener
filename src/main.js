import React from 'react';
import './style.scss';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      tags: [],
      all_selected: true,
      word: null,
      count: null,
      is_open: true
    };
  }

  async componentDidMount() {
  }

  __changeSelection(id) {
    const tagsState = this.state.tags.map((val) => {
      return {
        id: val.id,
        name: val.name,
        selected: (val.id === id ? !val.selected : val.selected)
      };
    });

    console.log(tagsState);
    this.setState( {tags: tagsState });
  }
  
  __changeAllChecks() {
    this.setState({all_selected: !this.state.all_selected});

    const tagsState = this.state.tags.map((val) => {
      return {
        id: val.id,
        name: val.name,
        selected: !this.state.all_selected
      }
    })
    this.setState({tags: tagsState})
  }

  async openHandle( req, res ) {
    const pick_articles = await axios({
      method: 'GET',
      url: '/api/pick',
      params: {
        access_token: Cookies.get('access_token'),
        tag: '',
        word: '',
        count: 5
      }
    })
    console.log(pick_articles)
  }
  render() {
    return (
      <main className="main-Container d-flex flex-column justify-content-center align-items-center mt-5">
        <p>認証済み</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">タグ</th>
              <td>
                <label>
                  <input type="checkbox" checked={ this.state.all_selected } onChange={() => this.__changeAllChecks()}/>
                  全て
                </label>
                { this.state.tags.map((val, key) => (
                  <label key={ key }>
                    <input type="checkbox" checked={ val.selected } onChange={ this.__changeSelection.bind(this, val.id) }/>
                    { val.name }
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="col">ワード</th>
              <td>ワード</td>
            </tr>
          </tbody>
        </table>
        <Button className="mt-5" variant="outline-secondary" onClick={() => this.openHandle()}>OPEN</Button>
      </main>
    );
  }
}

export default Main;