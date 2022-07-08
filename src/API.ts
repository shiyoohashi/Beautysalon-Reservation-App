/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReservationInput = {
  id?: string | null,
  date?: string | null,
  menu?: string | null,
  stylistId?: number | null,
  customerId?: string | null,
};

export type ModelReservationConditionInput = {
  date?: ModelStringInput | null,
  menu?: ModelStringInput | null,
  stylistId?: ModelIntInput | null,
  customerId?: ModelStringInput | null,
  and?: Array< ModelReservationConditionInput | null > | null,
  or?: Array< ModelReservationConditionInput | null > | null,
  not?: ModelReservationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type reservation = {
  __typename: "reservation",
  id: string,
  date?: string | null,
  menu?: string | null,
  stylistId?: number | null,
  customerId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateReservationInput = {
  id: string,
  date?: string | null,
  menu?: string | null,
  stylistId?: number | null,
  customerId?: string | null,
};

export type DeleteReservationInput = {
  id: string,
};

export type CreateMenuInput = {
  id?: string | null,
  menu?: string | null,
  amountOfMoney?: number | null,
  treatmentTime?: number | null,
};

export type ModelMenuConditionInput = {
  menu?: ModelStringInput | null,
  amountOfMoney?: ModelIntInput | null,
  treatmentTime?: ModelIntInput | null,
  and?: Array< ModelMenuConditionInput | null > | null,
  or?: Array< ModelMenuConditionInput | null > | null,
  not?: ModelMenuConditionInput | null,
};

export type menu = {
  __typename: "menu",
  id: string,
  menu?: string | null,
  amountOfMoney?: number | null,
  treatmentTime?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMenuInput = {
  id: string,
  menu?: string | null,
  amountOfMoney?: number | null,
  treatmentTime?: number | null,
};

export type DeleteMenuInput = {
  id: string,
};

export type CreateStylistInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelStylistConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelStylistConditionInput | null > | null,
  or?: Array< ModelStylistConditionInput | null > | null,
  not?: ModelStylistConditionInput | null,
};

export type stylist = {
  __typename: "stylist",
  id: string,
  name?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateStylistInput = {
  id: string,
  name?: string | null,
};

export type DeleteStylistInput = {
  id: string,
};

export type CreateCustomerInput = {
  id?: string | null,
  name?: string | null,
  mail?: string | null,
};

export type ModelCustomerConditionInput = {
  name?: ModelStringInput | null,
  mail?: ModelStringInput | null,
  and?: Array< ModelCustomerConditionInput | null > | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  not?: ModelCustomerConditionInput | null,
};

export type customer = {
  __typename: "customer",
  id: string,
  name?: string | null,
  mail?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCustomerInput = {
  id: string,
  name?: string | null,
  mail?: string | null,
};

export type DeleteCustomerInput = {
  id: string,
};

export type CreateHolidayInput = {
  id?: string | null,
  date?: string | null,
};

export type ModelHolidayConditionInput = {
  date?: ModelStringInput | null,
  and?: Array< ModelHolidayConditionInput | null > | null,
  or?: Array< ModelHolidayConditionInput | null > | null,
  not?: ModelHolidayConditionInput | null,
};

export type holiday = {
  __typename: "holiday",
  id: string,
  date?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateHolidayInput = {
  id: string,
  date?: string | null,
};

export type DeleteHolidayInput = {
  id: string,
};

export type ModelReservationFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  menu?: ModelStringInput | null,
  stylistId?: ModelIntInput | null,
  customerId?: ModelStringInput | null,
  and?: Array< ModelReservationFilterInput | null > | null,
  or?: Array< ModelReservationFilterInput | null > | null,
  not?: ModelReservationFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelReservationConnection = {
  __typename: "ModelReservationConnection",
  items:  Array<reservation | null >,
  nextToken?: string | null,
};

export type ModelMenuFilterInput = {
  id?: ModelIDInput | null,
  menu?: ModelStringInput | null,
  amountOfMoney?: ModelIntInput | null,
  treatmentTime?: ModelIntInput | null,
  and?: Array< ModelMenuFilterInput | null > | null,
  or?: Array< ModelMenuFilterInput | null > | null,
  not?: ModelMenuFilterInput | null,
};

export type ModelMenuConnection = {
  __typename: "ModelMenuConnection",
  items:  Array<menu | null >,
  nextToken?: string | null,
};

export type ModelStylistFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelStylistFilterInput | null > | null,
  or?: Array< ModelStylistFilterInput | null > | null,
  not?: ModelStylistFilterInput | null,
};

export type ModelStylistConnection = {
  __typename: "ModelStylistConnection",
  items:  Array<stylist | null >,
  nextToken?: string | null,
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  mail?: ModelStringInput | null,
  and?: Array< ModelCustomerFilterInput | null > | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  not?: ModelCustomerFilterInput | null,
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<customer | null >,
  nextToken?: string | null,
};

export type ModelHolidayFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelHolidayFilterInput | null > | null,
  or?: Array< ModelHolidayFilterInput | null > | null,
  not?: ModelHolidayFilterInput | null,
};

export type ModelHolidayConnection = {
  __typename: "ModelHolidayConnection",
  items:  Array<holiday | null >,
  nextToken?: string | null,
};

export type CreateReservationMutationVariables = {
  input: CreateReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type CreateReservationMutation = {
  createReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReservationMutationVariables = {
  input: UpdateReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type UpdateReservationMutation = {
  updateReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReservationMutationVariables = {
  input: DeleteReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type DeleteReservationMutation = {
  deleteReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMenuMutationVariables = {
  input: CreateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type CreateMenuMutation = {
  createMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMenuMutationVariables = {
  input: UpdateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type UpdateMenuMutation = {
  updateMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMenuMutationVariables = {
  input: DeleteMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type DeleteMenuMutation = {
  deleteMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStylistMutationVariables = {
  input: CreateStylistInput,
  condition?: ModelStylistConditionInput | null,
};

export type CreateStylistMutation = {
  createStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStylistMutationVariables = {
  input: UpdateStylistInput,
  condition?: ModelStylistConditionInput | null,
};

export type UpdateStylistMutation = {
  updateStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStylistMutationVariables = {
  input: DeleteStylistInput,
  condition?: ModelStylistConditionInput | null,
};

export type DeleteStylistMutation = {
  deleteStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCustomerMutationVariables = {
  input: CreateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  input: UpdateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  input: DeleteCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHolidayMutationVariables = {
  input: CreateHolidayInput,
  condition?: ModelHolidayConditionInput | null,
};

export type CreateHolidayMutation = {
  createHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHolidayMutationVariables = {
  input: UpdateHolidayInput,
  condition?: ModelHolidayConditionInput | null,
};

export type UpdateHolidayMutation = {
  updateHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHolidayMutationVariables = {
  input: DeleteHolidayInput,
  condition?: ModelHolidayConditionInput | null,
};

export type DeleteHolidayMutation = {
  deleteHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetReservationQueryVariables = {
  id: string,
};

export type GetReservationQuery = {
  getReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReservationsQueryVariables = {
  filter?: ModelReservationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReservationsQuery = {
  listReservations?:  {
    __typename: "ModelReservationConnection",
    items:  Array< {
      __typename: "reservation",
      id: string,
      date?: string | null,
      menu?: string | null,
      stylistId?: number | null,
      customerId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMenuQueryVariables = {
  id: string,
};

export type GetMenuQuery = {
  getMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMenusQueryVariables = {
  filter?: ModelMenuFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMenusQuery = {
  listMenus?:  {
    __typename: "ModelMenuConnection",
    items:  Array< {
      __typename: "menu",
      id: string,
      menu?: string | null,
      amountOfMoney?: number | null,
      treatmentTime?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStylistQueryVariables = {
  id: string,
};

export type GetStylistQuery = {
  getStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStylistsQueryVariables = {
  filter?: ModelStylistFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStylistsQuery = {
  listStylists?:  {
    __typename: "ModelStylistConnection",
    items:  Array< {
      __typename: "stylist",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "customer",
      id: string,
      name?: string | null,
      mail?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHolidayQueryVariables = {
  id: string,
};

export type GetHolidayQuery = {
  getHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHolidaysQueryVariables = {
  filter?: ModelHolidayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHolidaysQuery = {
  listHolidays?:  {
    __typename: "ModelHolidayConnection",
    items:  Array< {
      __typename: "holiday",
      id: string,
      date?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReservationSubscription = {
  onCreateReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReservationSubscription = {
  onUpdateReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReservationSubscription = {
  onDeleteReservation?:  {
    __typename: "reservation",
    id: string,
    date?: string | null,
    menu?: string | null,
    stylistId?: number | null,
    customerId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMenuSubscription = {
  onCreateMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMenuSubscription = {
  onUpdateMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMenuSubscription = {
  onDeleteMenu?:  {
    __typename: "menu",
    id: string,
    menu?: string | null,
    amountOfMoney?: number | null,
    treatmentTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStylistSubscription = {
  onCreateStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStylistSubscription = {
  onUpdateStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStylistSubscription = {
  onDeleteStylist?:  {
    __typename: "stylist",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer?:  {
    __typename: "customer",
    id: string,
    name?: string | null,
    mail?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHolidaySubscription = {
  onCreateHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHolidaySubscription = {
  onUpdateHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHolidaySubscription = {
  onDeleteHoliday?:  {
    __typename: "holiday",
    id: string,
    date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
