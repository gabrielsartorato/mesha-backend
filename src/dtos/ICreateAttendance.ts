import { User } from '@models/User';

export interface ICreateAttendanceDTO {
  user: User;
  total_price: number;
  services: IServices[];
}

interface IServices {
  service_id: number;
  name_service: string;
  price: number;
}
