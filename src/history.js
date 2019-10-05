import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class History extends React.Component {

  render() {
    return (
      <div>
        <p>履歴</p>
        <Card>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
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
