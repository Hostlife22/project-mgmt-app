/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProject
// ====================================================

export interface getProject_project_client {
  __typename: "Client";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface getProject_project {
  __typename: "Project";
  id: string | null;
  name: string | null;
  description: string | null;
  status: string | null;
  client: getProject_project_client | null;
}

export interface getProject {
  project: getProject_project | null;
}

export interface getProjectVariables {
  id: string;
}
