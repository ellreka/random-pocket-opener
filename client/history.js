import React from 'react';

class History extends React.Component {

  render() {
    return (
      <div className="history-Content">
        <h5 className="font-weight-bold">History</h5>
        <ul className="history-CardList">
        {this.props.history.map((val,key) => (
          <li key={ key } className="history-Card">
            <a href={ val.url } target="_blank">
              <img src={ val.image.src || './images/no-image.png' } />
              <p>{val.title}</p>
            </a>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default History;
