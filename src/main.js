import React from 'react';
import './style.scss';
import { Button } from 'reactstrap';
class Main extends React.Component {
  render() {
    return (
      <main className="login-Container d-flex flex-column justify-content-center align-items-center mt-5">
        <p>認証済み</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">タグ</th>
              <td>タグが並ぶ</td>
            </tr>
            <tr>
              <th scope="col">ワード</th>
              <td>ワード</td>
            </tr>
          </tbody>
        </table>
      </main>
    );
  }
}

export default Main;