import React from 'react';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { ADRESS, getData } from './sources';

class MessageList extends React.Component {
  state = {
    data: [],
    details: [],
  }

  async componentDidMount() {
    const webData = await getData(ADRESS);
    const requests = webData.map(item => getData(ADRESS.concat(item.id)));
    const results = await Promise.all(requests);

    this.setState({
      details: results,
      data: this.sortDescending(webData),
    });
  }

  sortDescending = arr => arr.sort((a, b) => Date.parse(b.received_at) - Date.parse(a.received_at));

  render() {
    const { data, details } = this.state;
    const { match } = this.props;

    return (
      <ul className="post-container">
        {data.map(item => (

          <Link
            to={`${match.path}${item.id}`}
            className="link"
          >
            <li className="post-item">
              <p>
                <span className="topic">
                  {item.received_at.slice(0, 10)}
                </span>
              </p>
              <p>
                <span>important: </span>
                <span>
                  {`${details.filter(elem => elem.id === item.id)[0].important}`}
                </span>
                <br />
                <span>is read: </span>
                <span>
                  {`${details.filter(elem => elem.id === item.id)[0].is_read}`}
                </span>
                <br />
                <span>subject: </span>
                <span>{item.subject}</span>
                <br />
                <span>preheader: </span>
                <span>
                  {item.preheader}
                </span>
                <br />
                <span>user: </span>
                <span>
                  {item.from_message.slice(1, item.from_message.length - 1)}
                </span>
              </p>
            </li>
          </Link>
        ))}
      </ul>
    );
  }
}

MessageList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default MessageList;
