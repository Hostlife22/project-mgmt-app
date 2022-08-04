/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProjects
// ====================================================

export interface getProjects_projects {
  __typename: "Project";
  id: string | null;
  name: string | null;
  status: string | null;
}

export interface getProjects {
  projects: (getProjects_projects | null)[] | null;
}
