import React from 'react';
import { Button, Spinner, Input } from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import LZString from 'lz-string';
import History from './history';

class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      tags: [],
      all_selected: true,
      word: '',
      count: 1,
      open: true,
      isLoading: false,
      history: []
    };
  }

  async componentDidMount() {
    const pocket_data = await axios({
      method: 'GET',
      url: '/api/get',
      params: {
        access_token: Cookies.get('access_token')
      }
    })
    console.log(pocket_data)
    const tags_data = pocket_data.data.tags.map((val,index) => {
      return {
        id: index,
        name: val,
        selected: true
      }
    })
    localStorage.setItem('pocket_articles',pocket_data.data.articles)
    this.setState({tags: tags_data})
    this.setState({isLoading: true})
  }

  __changeSelection(id) {
    const tagsState = this.state.tags.map((val) => {
      return {
        id: val.id,
        name: val.name,
        selected: (val.id === id ? !val.selected : val.selected)
      };
    });
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
    const local_data = LZString.decompressFromUTF16(localStorage.getItem('pocket_articles'));
    const word_sort = JSON.parse(local_data).filter(val => val.title.indexOf(this.state.word) !== -1);
    const tags_sort = word_sort.filter(val => val.tags.some((val) => this.state.tags.map((x) => x.selected ? x.name : null).includes(val)));
    console.log(tags_sort)
    const random_arr = ([...arr], n = 1) => {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr.slice(0, n);
    };
    let history_arr = this.state.history.reverse();
    for(let i of random_arr(tags_sort, this.state.count)) {
      console.log(i)
      if(this.state.open) {
        window.open(i.url)
      }
      history_arr.unshift({'title': i.title, 'url': i.url, 'image': i.image})
    }
    this.setState({history: history_arr})
  }
  render() {
    return (
      <main>
        {!this.state.isLoading ? (
          <div className="st-Content">
            <p>now loading ...</p>
            <Spinner animation="border"/>
          </div>
        ) : (
          <div className="st-Content">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th>tag</th>
                  <td>
                    <label>
                      <input type="checkbox" checked={ this.state.all_selected } onChange={() => this.__changeAllChecks()}/>
                      all
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
                  <th>word</th>
                  <td>
                      <Input value={this.state.word} onChange={(e) => this.setState({word: e.target.value})}/>
                  </td>
                </tr>
                <tr>
                  <th>count</th>
                  <td>
                  <select className="form-control" onChange={(e) => this.setState({count: e.target.value})}>
                    { [...Array(10).keys()].map((v,i) =>
                      <option value={++i} key={i}>{i}</option>
                    ) }
                  </select>
                  </td>
                </tr>
                <tr>
                  <th>sort</th>
                  <td>
                    <label>
                      <input type="radio"/>
                      newest
                    </label>
                    <label>
                      <input type="radio"/>
                      oldest
                    </label>
                    <label>
                      <input type="radio"/>
                      random
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>open</th>
                  <td>
                    <label>
                      <input type="checkbox" onChange={() => this.setState({open: !this.state.open})} checked={ this.state.open }/>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button className="mt-2" variant="outline-secondary" onClick={() => this.openHandle()}>OPEN</Button>
            <History history={this.state.history}/>
          </div>
        )}
      </main>
    );
  }
}

export default Main;