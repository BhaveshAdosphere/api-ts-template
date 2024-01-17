// Exporting Module
export default {
    SUCCESS: 'Success',
    CREATED: 'Created',
    BAD_REQUEST: `Bad Request`,
    NOT_FOUND: (entity: string) => `${(entity[0] ?? '').toUpperCase() + entity.slice(1)} not found`,
    SOMETHING_WENT_WRONG: 'Oops! Something is not right'
} as const
