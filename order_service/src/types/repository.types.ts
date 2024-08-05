type Create = (inputDat: any) => Promise<{}>;
type Find = (inputDat: any) => Promise<{}>;
type Update = (inputDat: any) => Promise<{}>
type Delete = (inputDat: any) => Promise<{}>;

export type cartRepositoryType = {
  create: Create,
  find: Find,
  update: Update,
  delete: Delete
}


export type orderRepositoryType = {
  create: Create,
  find: Find,
  update: Update,
  delete: Delete
}