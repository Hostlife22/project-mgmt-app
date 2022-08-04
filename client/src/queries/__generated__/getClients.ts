/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getClients
// ====================================================

export interface getClients_clients {
  __typename: "Client";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface getClients {
  clients: (getClients_clients | null)[] | null;
}
