"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  PiggyBank,
  Landmark,
  FileText,
  Shield,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { getDashboardData } from "../actions/dashboard"

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Use the user ID from auth context if available, otherwise use a demo UUID
      const userId = user?.id || "00000000-0000-0000-0000-000000000000"

      const result = await getDashboardData(userId)
      if (result.success) {
        setDashboardData(result.data)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to load dashboard data. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on component mount and when user changes
  useEffect(() => {
    fetchDashboardData()
  }, [user])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const refreshData = () => {
    fetchDashboardData()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsAddingTransaction(true)}>
            <DollarSign className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData ? formatCurrency(dashboardData.totalBalance) : "₹0.00"}
                </div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData ? formatCurrency(dashboardData.monthlyIncome) : "₹0.00"}
                </div>
                <div className="flex items-center pt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">+5.1% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData ? formatCurrency(dashboardData.monthlyExpenses) : "₹0.00"}
                </div>
                <div className="flex items-center pt-1">
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  <p className="text-xs text-red-500">+2.5% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData ? `${dashboardData.savingsRate.toFixed(1)}%` : "0.0%"}
                </div>
                <div className="flex items-center pt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">+7.2% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={dashboardData?.chartData || []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="expenses" name="Expenses" fill="#8b5cf6" />
                    <Bar dataKey="income" name="Income" fill="#6366f1" />
                    <Bar dataKey="savings" name="Savings" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
                <CardDescription>Your monthly budget allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData?.budgetData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(dashboardData?.budgetData || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Financial Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">82/100</div>
                <div className="mt-4 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Your financial health is good. Consider increasing your emergency fund.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.transactions && dashboardData.transactions.length > 0 ? (
                    dashboardData.transactions.map((transaction: any, index: number) => (
                      <div key={transaction.id || index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2">
                            <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.category || "Uncategorized"}</p>
                            <p className="text-xs text-gray-500">{formatDate(transaction.transaction_date)}</p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-medium ${Number(transaction.amount) < 0 ? "text-red-500" : "text-green-500"}`}
                        >
                          {formatCurrency(Number(transaction.amount))}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No recent transactions</p>
                  )}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Financial Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/budgeting">
                    <Button variant="outline" className="w-full justify-start">
                      <PiggyBank className="mr-2 h-4 w-4" />
                      Budgeting Tool
                    </Button>
                  </Link>
                  <Link href="/investments">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Investment Planner
                    </Button>
                  </Link>
                  <Link href="/loans">
                    <Button variant="outline" className="w-full justify-start">
                      <Landmark className="mr-2 h-4 w-4" />
                      Loan Calculator
                    </Button>
                  </Link>
                  <Link href="/taxes">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Tax Estimator
                    </Button>
                  </Link>
                  <Link href="/policies">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Insurance Policies
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>AI-powered recommendations for your finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Spending Alert</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your dining out expenses are 35% higher than last month. Consider setting a budget for this
                      category.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Saving Opportunity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You could save $240 annually by switching to a no-fee checking account. Would you like to see
                      options?
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <PiggyBank className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Savings Goal Progress</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You're 65% of the way to your emergency fund goal. At your current rate, you'll reach your target
                      in 3 months.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">
                <Link href="/assistant">Get Personalized Advice</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Your spending patterns over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={dashboardData?.chartData || []}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Download or view your financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">June 2023 Financial Summary</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete overview of your finances for June 2023
                    </p>
                  </div>
                  <Button>Download</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Q2 2023 Tax Estimate</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Estimated tax liability for the second quarter
                    </p>
                  </div>
                  <Button>Download</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">2023 YTD Spending Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Detailed breakdown of your spending habits
                    </p>
                  </div>
                  <Button>Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated on important financial events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                  <div>
                    <h4 className="font-medium">Bill Payment Reminder</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your electricity bill of $85.42 is due in 3 days.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Today, 9:45 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
                  <div>
                    <h4 className="font-medium">Deposit Received</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You received a deposit of $1,800.00 from ACME Corp.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday, 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
                  <div>
                    <h4 className="font-medium">Unusual Activity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We detected an unusual transaction of $299.99 at Electronics Store.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Jun 15, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Dialog */}
      <AddTransactionDialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction} onSuccess={refreshData} />
    </div>
  )
}
