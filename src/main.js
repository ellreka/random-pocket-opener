import React from 'react';
import { Button, Spinner, Input, Slect } from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      tags: [],
      all_selected: true,
      word: '',
      count: 1,
      is_open: true,
      isLoading: true
    };
  }

  async componentDidMount() {
    // const res_tags = await axios({
    //   method: 'GET',
    //   url: '/api/tags',
    //   params: {
    //     access_token: Cookies.get('access_token')
    //   }
    // })
    // console.log(res_tags.data)
    // const tags_data = res_tags.data.map((val,index) => {
    //   return {
    //     id: index,
    //     name: val,
    //     selected: true
    //   }
    // })
    // this.setState({tags: tags_data})
    // this.setState({isLoading: true})
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
    const res_articles = await axios({
      method: 'GET',
      url: '/api/pick',
      params: {
        access_token: Cookies.get('access_token'),
        tag: '',
        word: this.state.word,
        count: Number(this.state.count)
      }
    })
    console.log(res_articles)
  }
  render() {
    return (
      <main className="main-Container d-flex flex-column justify-content-center align-items-center mt-5">
        {!this.state.isLoading ? (
          <Spinner animation="border"/>
        ) : (
          <div>
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
                  <td>
                      <Input value={this.state.word} onChange={(e) => this.setState({word: e.target.value})}/>
                  </td>
                </tr>
                <tr>
                  <th scope="col">count</th>
                  <td>
                  <select className="form-control" onChange={(e) => this.setState({count: e.target.value})}>
                    { [...Array(10).keys()].map((v,i) => 
                      <option value={++i} key={i}>{i}</option>
                    ) }
                  </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button className="mt-5" variant="outline-secondary" onClick={() => this.openHandle()}>OPEN</Button>
          </div>
        )}
      </main>
    );
  }
}

export default Main;