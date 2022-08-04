/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addClient
// ====================================================

export interface addClient_addClient {
  __typename: "Client";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface addClient {
  addClient: addClient_addClient | null;
}

export interface addClientVariables {
  name: string;
  email: string;
  phone: string;
}
