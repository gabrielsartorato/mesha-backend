export interface ICreateAttendanceDTO {
  user_id: string;
  total_price: number;
  services: IServices[];
}

interface IServices {
  service_id: number;
  name_service: string;
  price: number;
}
