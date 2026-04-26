import NavBar from '../components/NavBar';
import { useAuth } from '../contexts/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Profile() {
  const { currentUser, users } = useAuth();
  const profile = users.find((user) => user.username === currentUser) ?? {
    username: 'Unknown',
    email: 'Not available',
    mobile: 'Not available',
  };
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-foreground mb-6">User Profile</h2>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <p className="text-sm font-medium">{profile.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email address</label>
                  <p className="text-sm font-medium">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mobile</label>
                  <p className="text-sm font-medium">{profile.mobile}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-sm font-medium">Administrator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}   