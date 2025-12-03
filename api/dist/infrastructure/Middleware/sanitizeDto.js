// каюсь эту функцию от и до написало ии
export function sanitizeDto(dto) {
    return Object.fromEntries(Object.entries(dto).filter(([_, v]) => v !== undefined)); // тут TS всё равно не сможет вывести идеально, но возвращаемый тип будет точный
}
//# sourceMappingURL=sanitizeDto.js.map