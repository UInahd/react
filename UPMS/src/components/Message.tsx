import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
        <div className="message space-y-4">
            {messages.map((message) => (
                <Card key={message.id}>
                    <CardHeader>
                        <CardTitle className="text-lg">Message #{message.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{message.text}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default Message;