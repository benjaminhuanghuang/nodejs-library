## 08 - Core Concept - Middleware and Error Handling

## 11 - Usering Async Await
exports.fun = async (res, res)=>{
    try
    {}
    catch(error)
    {

    }   
}
Instead of using try{} catch(e) {} in each controller, we wrap the function in
catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};