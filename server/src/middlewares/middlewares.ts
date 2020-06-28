// checkAuth middleware checks if the current requests is authenticated
export function checkAuth(req, res, next) {
    /* console.log(req)
    console.log(req.user)
    console.dir(req.session) */
    if (req.isAuthenticated()) return next();
    next("request not authenticated");
  }