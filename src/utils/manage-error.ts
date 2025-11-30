import type { HttpResponse } from '@/api/http-response.interface';
import { AxiosError } from 'axios';

export function getMassageAxiosError(error: unknown) {
  const axiosError = error as AxiosError;
  const response = axiosError?.response?.data as HttpResponse<unknown>;
  return response?.message || 'เกิดข้อผิดพลาด';
}
