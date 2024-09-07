export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed'; // Usando tipos literais para status
}
