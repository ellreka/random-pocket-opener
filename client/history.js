import React from 'react';

class History extends React.Component {

  render() {
    return (
      <div>
        <p>履歴</p>
        <a className="history-card" href="#">
          <img src="#" alt=""/>
          <p>あああああ</p>
        </a>
        {this.props.history.map((val,key) => (
          <div key={ key }>
            <p key={ key }>{val.title}</p>
            {/* <p>{ val.image }</p> */}
            <img src={ val.image.src || '' } />
          </div>
        ))}
      </div>
    );
  }
}

export default History;
