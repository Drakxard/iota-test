"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import SensorData from './SensorData';

interface Transaction {
  hash: string;
  address: string;
  message: string;
  timestamp: string;
}

interface SensorReading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);

  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleNewSensorData = (data: SensorReading) => {
    setSensorData([...sensorData, data]);
  };

  return (
    <Tabs defaultValue="transactions" className="space-y-4">
      <TabsList>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="sensor-data">Sensor Data</TabsTrigger>
      </TabsList>
      <TabsContent value="transactions">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>New Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm onNewTransaction={handleNewTransaction} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="sensor-data">
        <Card>
          <CardHeader>
            <CardTitle>Sensor Data</CardTitle>
          </CardHeader>
          <CardContent>
            <SensorData data={sensorData} onNewData={handleNewSensorData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}