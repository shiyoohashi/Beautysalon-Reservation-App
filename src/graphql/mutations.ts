/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
      id
      menu
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
      id
      menu
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
      id
      menu
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const createStylist = /* GraphQL */ `
  mutation CreateStylist(
    $input: CreateStylistInput!
    $condition: ModelStylistConditionInput
  ) {
    createStylist(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateStylist = /* GraphQL */ `
  mutation UpdateStylist(
    $input: UpdateStylistInput!
    $condition: ModelStylistConditionInput
  ) {
    updateStylist(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteStylist = /* GraphQL */ `
  mutation DeleteStylist(
    $input: DeleteStylistInput!
    $condition: ModelStylistConditionInput
  ) {
    deleteStylist(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      name
      mail
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      name
      mail
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      name
      mail
      createdAt
      updatedAt
    }
  }
`;
export const createHoliday = /* GraphQL */ `
  mutation CreateHoliday(
    $input: CreateHolidayInput!
    $condition: ModelHolidayConditionInput
  ) {
    createHoliday(input: $input, condition: $condition) {
      id
      date
      createdAt
      updatedAt
    }
  }
`;
export const updateHoliday = /* GraphQL */ `
  mutation UpdateHoliday(
    $input: UpdateHolidayInput!
    $condition: ModelHolidayConditionInput
  ) {
    updateHoliday(input: $input, condition: $condition) {
      id
      date
      createdAt
      updatedAt
    }
  }
`;
export const deleteHoliday = /* GraphQL */ `
  mutation DeleteHoliday(
    $input: DeleteHolidayInput!
    $condition: ModelHolidayConditionInput
  ) {
    deleteHoliday(input: $input, condition: $condition) {
      id
      date
      createdAt
      updatedAt
    }
  }
`;
export const createShopmenu = /* GraphQL */ `
  mutation CreateShopmenu(
    $input: CreateShopmenuInput!
    $condition: ModelShopmenuConditionInput
  ) {
    createShopmenu(input: $input, condition: $condition) {
      id
      menu
      detail
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const updateShopmenu = /* GraphQL */ `
  mutation UpdateShopmenu(
    $input: UpdateShopmenuInput!
    $condition: ModelShopmenuConditionInput
  ) {
    updateShopmenu(input: $input, condition: $condition) {
      id
      menu
      detail
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteShopmenu = /* GraphQL */ `
  mutation DeleteShopmenu(
    $input: DeleteShopmenuInput!
    $condition: ModelShopmenuConditionInput
  ) {
    deleteShopmenu(input: $input, condition: $condition) {
      id
      menu
      detail
      amountOfMoney
      treatmentTime
      createdAt
      updatedAt
    }
  }
`;
export const createReserve = /* GraphQL */ `
  mutation CreateReserve(
    $input: CreateReserveInput!
    $condition: ModelReserveConditionInput
  ) {
    createReserve(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
export const updateReserve = /* GraphQL */ `
  mutation UpdateReserve(
    $input: UpdateReserveInput!
    $condition: ModelReserveConditionInput
  ) {
    updateReserve(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
export const deleteReserve = /* GraphQL */ `
  mutation DeleteReserve(
    $input: DeleteReserveInput!
    $condition: ModelReserveConditionInput
  ) {
    deleteReserve(input: $input, condition: $condition) {
      id
      date
      menu
      stylistId
      customerId
      createdAt
      updatedAt
    }
  }
`;
