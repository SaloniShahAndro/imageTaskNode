var statusString = {  
                        0 : 'failed' , 
                        1 : 'success' 
                    };

/**
 * -------------------------------------------------------------------
 * Start : Helper Functions to modify the reponse
 * -------------------------------------------------------------------
 */

const send = ( res , data = [] , message = 'Success' ) => {
    response = {status : statusString[1],data,message};
    return res.send(response);
}

const error = ( res , message = 'Something went wrong' , data = [] ) => {
    response = {status : statusString[0],data,message};
    return res.send(response);
}

const vfaild = (res , response) => {
    return res.status(400).send(response);
}

const statusError = ( res , status = 400 , message = 'Something went wrong' ) => {
    response = {status : statusString[0], data : [] ,message};
    return res.status(status).send(response);
}

/**
 * -------------------------------------------------------------------
 * End : Helper Functions to modify the reponse
 * -------------------------------------------------------------------
 */

module.exports = { send , error , statusError , vfaild };