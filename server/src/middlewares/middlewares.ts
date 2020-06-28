// checkAuth middleware checks if the current requests is authenticated
export function checkAuth(req, res, next) {
    console.log(req.passport)
    if (req.isAuthenticated()) return next();
    next("request not authenticated");
  }