const v = require('validator');

/** 
 * This Function will validate the "fields" against the "validators" in 2 parts
 * 1. it will check for any missing fields
 * 2. if all fields are avaulables then check for the data types
 * 
 * res : to send the response if any error found
 * validators : rules to check the validation
 * fields : fields that we get from the client side
 */
exports.validate = ( res , validators , fields ) => {

    var returnRes = { 'status' : false , message : '' , 'data' : [] };

    var missingFields = [];
    var failedFields = [];

    //------------- Start : Missing fields validations ---------------- //
    for(key in validators)
    {
        if(!fields[key] && validators[key].indexOf('optional') == -1 )
        {
            missingFields.push(key)
        }
    }

    if(missingFields.length > 0) {
        returnRes.status = false;
        returnRes.data = missingFields;
        returnRes.message = "Missing Fields : Please send proper fields";
        cres.vfaild(res , returnRes);
        return false;
    }
    //------------- End : Missing fields validations ---------------- //
    //------------- Start : Data type validations -------------- //
    else {
        for(key in validators)
        {
            var validations = validators[key].split("|");

            // check if the field is optional or not
            if(validations.indexOf('optional') > -1)
            {
                // check if optional filed is available or not 
                // if not then move to next field
                if(fields[key] == undefined)
                    continue;                
            }

            var value = fields[key].toString();
            var errors = [];
            
            if(v.isEmpty(value))
            {
                errors.push('Field is empty');
            }

            if(validations.indexOf('integer') > -1)
            {
                v.isInt(value) ? '' : errors.push('Field is not ineteger') ;
            }

            if(validations.indexOf('email') > -1)
            {
                v.isEmail(value) ? '' : errors.push('Provide proper mail id') ;
            }

            if(validations.indexOf('float') > -1)
            {
                v.isFloat(value) ? '' : errors.push('Field is not float') ;
            }

            if(errors.length > 0)
            {
                failedFields.push({'field' : key , errors});
            }
        }

        if(failedFields.length > 0)
        {
            returnRes.status = false;
            returnRes.data = failedFields;
            returnRes.message = "Wrong Data Fields : Please send proper data";
            cres.vfaild(res , returnRes);
            return false;
        }
    }
    //------------- Start : Data type validations -------------- //
    
    // Returns true if everything is good
    return true;
}