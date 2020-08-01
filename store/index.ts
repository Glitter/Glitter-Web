/* eslint-disable no-param-reassign */
import { types, applySnapshot, Instance } from 'mobx-state-tree';

const User = types.model({
  name: types.string,
  picture: types.string,
});

export const Store = types
  .model('Store', {
    me: types.maybe(User),
  })
  .actions(self => {
    const setMe = ({
      name,
      picture,
    }: {
      name: string;
      picture: string;
    }): void => {
      self.me = {
        name,
        picture,
      };
    };

    return {
      setMe,
    };
  });

export type StoreInterface = Instance<typeof Store>;

let store: StoreInterface = null as any;

export function initializeStore(isServer: boolean, snapshot: any = null) {
  if (isServer || store === null) {
    store = Store.create({
      me: undefined,
    });
  }

  if (snapshot !== null) {
    applySnapshot(store, snapshot);
  }

  return store;
}
