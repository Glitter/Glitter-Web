/// <reference types="next" />
/// <reference types="next/types/global" />

/// <reference types="next-images" />

declare module 'catchify' {
  declare function catchify(a: Promise<T>): Promise<[any, any]>;
  export default catchify;
}
