import { useAuth } from '../contexts/useAuth';
import HeaderSection from '../components/headerSection';
import NavBar from '../components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Dashboard() {
  const { currentUser, users } = useAuth();

  const stats = [
    { title: 'Total Bread Types', value: '6', icon: '🥖' },
    { title: 'Stock Remaining', value: '148', icon: '📦' },
    { title: 'Weekly Sales', value: '$1,980', icon: '💰' },
    { title: 'Registered Admins', value: String(users.length), icon: '👥' },
  ];

  const products = [
    { name: 'Sourdough Loaf', stock: 24, price: 6.5, sold: 35 },
    { name: 'Whole Wheat', stock: 18, price: 5.0, sold: 27 },
    { name: 'Baguette', stock: 32, price: 4.0, sold: 41 },
    { name: 'Raisin Bread', stock: 12, price: 5.5, sold: 18 },
    { name: 'Ciabatta', stock: 20, price: 5.8, sold: 22 },
    { name: 'Dinner Rolls', stock: 42, price: 3.0, sold: 55 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeaderSection />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Bread Shop Admin Dashboard</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Welcome back, <span className="font-semibold">{currentUser || 'Admin'}</span>. Monitor inventory and sales at a glance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <span className="text-2xl">{stat.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Inventory overview</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Updated live</span>
              </div>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Product</th>
                      <th className="px-4 py-3 text-left font-semibold">Stock</th>
                      <th className="px-4 py-3 text-left font-semibold">Price</th>
                      <th className="px-4 py-3 text-left font-semibold">Sold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {products.map((product) => (
                      <tr key={product.name}>
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3 font-medium">{product.stock}</td>
                        <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">{product.sold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">User management</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{users.length} admins</span>
              </div>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Username</th>
                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {users.map((user) => (
                      <tr key={user.username}>
                        <td className="px-4 py-3">{user.username}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Sales summary</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="mt-2 text-3xl font-bold">$420</p>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">This week</p>
                  <p className="mt-2 text-3xl font-bold">$1,980</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
