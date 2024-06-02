export class partyData {
  name: string;
  company_name: string;
  mobile_no: string;
  telephone_no: string;
  whatsapp_no: string;
  email: string;
  remark: string;
  login_access: boolean;
  date_of_birth: string;
  anniversary_date: string;
  gstin: string;
  pan_no: string;
  apply_tds: boolean;
  credit_limit: number;
  img: any;
  address: any;
  bank: any;
  bank_id: any;
  id:number;


  constructor(data: any) {
    this.id= data.id || 0;
    this.name = data.name;
    this.company_name = data.company_name;
    this.mobile_no = data.mobile_no;
    this.telephone_no = data.telephone_no;
    this.whatsapp_no = data.whatsapp_no;
    this.email = data.email;
    this.remark = data.remark;
    this.login_access = data.login_access;
    this.date_of_birth = data.date_of_birth;
    this.anniversary_date = data.anniversary_date;
    this.gstin = data.gstin;
    this.pan_no = data.pan_no;
    this.apply_tds = data.apply_tds;
    this.credit_limit = data.credit_limit;
    this.img = data.img;
    this.address = data.address;
    this.bank = data.bank;
    this.bank_id = data.bank||"";
  }
}
