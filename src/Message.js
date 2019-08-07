import React from 'react';
import PropTypes from 'prop-types';
import { ADRESS, getData } from './sources';

class Message extends React.Component {
  state = {
    data: '',
  }

  async componentDidMount() {
    const data = await getData(ADRESS.concat(`/${this.props.match.params.id}`));

    this.setState({
      data,
    });
  }

  render() {
    const {
      to, cc, bcc, body,
    } = this.state.data;

    return (
      <li className="post-item">
        <p>
          <span>to: </span>
          <span>
            {to && to.join(', ')}
          </span>
          <br />
          <span>cc: </span>
          <span>
            {cc && cc.join(', ')}
          </span>
          <br />
          <span>bcc: </span>
          <span>
            {bcc && bcc.join(', ')}
          </span>
          <br />
          <span>body: </span>
          <span>
            {body}
          </span>
        </p>
      </li>
    );
  }
}

Message.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default Message;
