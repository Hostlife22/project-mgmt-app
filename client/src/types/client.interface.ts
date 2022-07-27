export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IClientsData {
  clients: IClient[];
}

export interface IDeletedClient {
  deleteClient: IClient;
}
