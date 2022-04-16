export class ModifyPasswordModel {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;

  constructor() {
    this.OldPassword = "";
    this.NewPassword = "";
    this.ConfirmPassword = "";
  }
}
