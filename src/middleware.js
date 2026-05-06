export async function onRequest (context, next) {

    console.log(context.url.pathname);

    if(context.url.pathname.endsWith('/') 
        || context.url.pathname.endsWith('/callback') 
        || context.url.pathname.endsWith('/index.html')
        || context.url.pathname.endsWith('/privacy.html')
    ) return next();

    console.log('need to check stuff', context.url.pathname);
    let token = await context.session.get('access_token');
    console.log('token', token);

    if(!token) return context.redirect('/');
    context.locals.access_token = token;

    return next();
};