export interface User {
    id?: number;  // Opcionalno, jer će ID generirati in-memory server
    username: string;
    email: string;
    password: string;
  }
  