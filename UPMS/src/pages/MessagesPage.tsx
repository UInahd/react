import NavBar from '../components/NavBar';
import Message from '../components/Message';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-foreground mb-6">Messages</h2>
          <Message />
        </div>
      </main>
    </div>
  );
}