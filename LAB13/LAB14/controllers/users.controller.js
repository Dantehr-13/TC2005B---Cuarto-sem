exports.get_login = (request, response, next) => {
    response.render('login', {
        title: 'Iniciar Sesión'
    });
};

exports.post_login = (request, response, next) => {
    const { username, password } = request.body;

    // Simulating a database check
    if (username && password) {
        request.session.isLoggedIn = true;
        request.session.usuario = username;

        request.flash('exito', `Bienvenido al sistema de personajes, ${username}!`);
        return response.redirect('/personajes');
    }

    request.flash('error', 'Usuario o contraseña incorrectos.');
    response.redirect('/users/login');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};
