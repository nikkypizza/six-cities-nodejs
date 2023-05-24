import { createSHA256 } from '../core/helpers/index.js';
import { TUser } from '../types/user.type';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
/** extend от defaultClasses.TimeStamps дает классу поля createdAt, updatedAt */
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  constructor(userData: TUser) {
    super();

    const {email, userpic, name, isPro} = userData;

    this.email = email;
    this.userpic = userpic;
    this.name = name;
    this.isPro = isPro;
  }

  @prop({unique: true, required: true})
  public email: string;

  @prop({ required: false, default: '' })
  public userpic: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({required: true, default: false})
  public isPro: boolean;

  @prop({required: true, default: ''})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);