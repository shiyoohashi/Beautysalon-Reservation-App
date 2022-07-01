import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type reservationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type menuMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type stylistMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type customerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class reservation {
  readonly id: string;
  readonly date?: string | null;
  readonly menuId?: number | null;
  readonly stylistId?: number | null;
  readonly customerId?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<reservation, reservationMetaData>);
  static copyOf(source: reservation, mutator: (draft: MutableModel<reservation, reservationMetaData>) => MutableModel<reservation, reservationMetaData> | void): reservation;
}

export declare class menu {
  readonly id: string;
  readonly menu?: string | null;
  readonly amountOfMoney?: number | null;
  readonly treatmentTime?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<menu, menuMetaData>);
  static copyOf(source: menu, mutator: (draft: MutableModel<menu, menuMetaData>) => MutableModel<menu, menuMetaData> | void): menu;
}

export declare class stylist {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<stylist, stylistMetaData>);
  static copyOf(source: stylist, mutator: (draft: MutableModel<stylist, stylistMetaData>) => MutableModel<stylist, stylistMetaData> | void): stylist;
}

export declare class customer {
  readonly id: string;
  readonly name?: string | null;
  readonly mail?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<customer, customerMetaData>);
  static copyOf(source: customer, mutator: (draft: MutableModel<customer, customerMetaData>) => MutableModel<customer, customerMetaData> | void): customer;
}