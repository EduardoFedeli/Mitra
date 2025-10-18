// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  // Solução 1: Emulador Android
baseURL: 'http://10.0.2.2:3000',
});