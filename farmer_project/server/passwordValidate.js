const passwordValidate=require('password-validator')
const schema=new passwordValidate()

schema
.is().min(5)
.is().max(18)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().symbols()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports=schema;