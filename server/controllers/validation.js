export const checkLength = function(len) {
    let minLength = len;
    let maxLength = len;
     return {
       validator : function(value) {
         if (value === undefined) return true;
         return value.length >= minLength && value.length <= maxLength;
       },
       message : 'Phone number must have 10 digits'
     }
   }