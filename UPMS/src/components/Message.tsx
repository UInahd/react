import ListGroup from 'react-bootstrap/ListGroup';
function Message() {
    const messages = [
        { id: 1, text: 'Hello, how are you?' },
        { id: 2, text: 'Don\'t forget to check your profile.' },
        { id: 3, text: 'Your password will expire soon.' },
    ];
    
    if (messages.length === 0) {
        return <div className="message">No messages to display.</div>;
    }
  return (
    <div className="message">
        <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default Message;