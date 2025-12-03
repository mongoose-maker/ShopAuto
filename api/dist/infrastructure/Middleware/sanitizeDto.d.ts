export declare function sanitizeDto<T extends Record<string, any>>(dto: T): {
    [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined>;
};
//# sourceMappingURL=sanitizeDto.d.ts.map