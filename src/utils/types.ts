export type ModelRef<T> = {
    [P in keyof T]: T[P];
};
