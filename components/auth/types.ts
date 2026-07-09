export interface SignupData {
  phone: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  state: string;
  bvn: string;
  nin: string;
}

export const EMPTY_SIGNUP_DATA: SignupData = {
  phone: '',
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  state: '',
  bvn: '',
  nin: '',
};