
export type tUser = App.Locals['user'];

export function getPublicUserData(user: tUser) {
    return {
        username: user.displayName ?? '',
        email: user.email ?? '',
        installed_plugins: new Set(...Object.values(user.plugins)),
    };
}