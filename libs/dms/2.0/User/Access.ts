export module Access {
    export type Role = typeof Access.roles[ number ]
    export const roles = [
        'admin',
        'tester',
        'manager',
        'viewer',
        'onsite-technician',
    ] as const
}