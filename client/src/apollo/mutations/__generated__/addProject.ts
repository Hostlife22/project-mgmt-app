/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addProject
// ====================================================

export interface addProject_addProject_client {
  __typename: "Client";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface addProject_addProject {
  __typename: "Project";
  name: string | null;
  description: string | null;
  status: string | null;
  id: string | null;
  client: addProject_addProject_client | null;
}

export interface addProject {
  addProject: addProject_addProject | null;
}

export interface addProjectVariables {
  name: string;
  description: string;
  status?: ProjectStatus | null;
  clientId: string;
}
