/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectStatusUpdate } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateProject
// ====================================================

export interface updateProject_updateProject {
  __typename: "Project";
  id: string | null;
  name: string | null;
  description: string | null;
  status: string | null;
}

export interface updateProject {
  updateProject: updateProject_updateProject | null;
}

export interface updateProjectVariables {
  id: string;
  name?: string | null;
  description?: string | null;
  status?: ProjectStatusUpdate | null;
}
