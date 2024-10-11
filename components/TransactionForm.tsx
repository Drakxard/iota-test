"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';

interface Transaction {
  hash: string;
  address: string;
  message: string;
  timestamp: string;
}

interface TransactionFormProps {
  onNewTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onNewTransaction }: TransactionFormProps) {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Transaction>('/api/send-iota', { address, message });
      const cloneableData = JSON.parse(JSON.stringify(response.data)) as Transaction;
      onNewTransaction(cloneableData);
      setAddress('');
      setMessage('');
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Send Transaction</Button>
    </form>
  );
}