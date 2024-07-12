export interface Loan {
    id: number;
    totalAmount: number;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    totalInstalments: number;
    currentInstalment: number;
    instalmentAmount: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }