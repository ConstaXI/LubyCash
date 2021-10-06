import Client from "../../../entities/Client";

export default interface IFindClientsByStatus {
  execute: (status: string) => Promise<Client[] | undefined>
}
