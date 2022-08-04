/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteClient
// ====================================================

export interface deleteClient_deleteClient {
  __typename: "Client";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface deleteClient {
  deleteClient: deleteClient_deleteClient | null;
}

export interface deleteClientVariables {
  id: string;
}
