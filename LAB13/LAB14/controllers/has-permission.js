module.exports = (accionRequerida) => {
    return (request, response, next) => {
        if (!request.session.isLoggedIn) {
            return response.redirect('/users/login');
        }

        const permisos = request.session.permisos || [];

        if (!permisos.includes(accionRequerida)) {
            request.flash('error', 'No tienes permiso para realizar esta acción.');
            return response.redirect('/personajes');
        }

        next();
    };
};
