import NavBar from '../components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: '👥',
    },
    {
      title: 'Messages',
      value: '56',
      icon: '💬',
    },
    {
      title: 'Reports',
      value: '12',
      icon: '📊',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold text-foreground mb-6">Welcome to your Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <span className="text-2xl">{stat.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
