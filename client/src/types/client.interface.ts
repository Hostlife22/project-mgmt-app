export interface IClient {
  name: string;
  email: string;
  phone: string;
}

export interface IClientDetails extends IClient {
  id: string;
}

export interface IClientsData {
  clients: IClientDetails[];
}

export interface IDeletedClient {
  deleteClient: IClientDetails;
}
