import NavBar from '../components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Profile() {
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
                  <label className="text-sm font-medium text-muted-foreground">Full name</label>
                  <p className="text-sm font-medium">John Doe</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email address</label>
                  <p className="text-sm font-medium">john.doe@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-sm font-medium">Administrator</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-sm font-medium">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}   