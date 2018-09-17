export class IEmployee {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone_number?: number;
  contact_preference: string;
  date_of_birth: Date;
  department: string;
  is_active: boolean;
  img_path?: string;
  password?: string;
  confirmPassword?: string;
}
