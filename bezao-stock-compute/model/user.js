class UserModel{
    constructor(uid, lastName, firstName, accountType,
        dateOfBirth, gender, spouseName, martialStatus,
        mobileNumber, userName, accountPin, emailAddress,
        streetAddress, city, postalCode, country, password,
        accountNumber, accountBalance, cardBalance, loanBalance, suspended){
            this.uid = uid
            this.lastName = lastName
            this.firstName = firstName
            this.accountType = accountType
            this.dateOfBirth = dateOfBirth
            this.gender = gender
            this.spouseName = spouseName
            this.martialStatus = martialStatus
            this.mobileNumber = mobileNumber
            this.userName = userName
            this.accountPin = accountPin
            this.emailAddress = emailAddress
            this.streetAddress = streetAddress
            this.city = city
            this.postalCode = postalCode
            this.country = country
            this.password = password
            this.accountNumber = accountNumber
            this.accountBalance = accountBalance,
            this.cardBalance = cardBalance
            this.loanBalance = loanBalance
            this.suspended = suspended
    }

    toMap(){
        return {
            uid: this.uid,
            lastName : this.lastName,
            firstName : this.firstName,
            accountType : this.accountType,
            dateOfBirth : this.dateOfBirth,
            gender : this.gender,
            spouseName : this.spouseName,
            martialStatus : this.martialStatus,
            mobileNumber : this.mobileNumber,
            userName : this.userName,
            accountPin : this.accountPin,
            emailAddress : this.emailAddress,
            streetAddress : this.streetAddress,
            city : this.city,
            postalCode : this.postalCode,
            country : this.country,
            password : this.password,
            accountNumber : this.accountNumber,
            accountBalance : this.accountBalance,
            cardBalance : this.cardBalance,
            loanBalance : this.loanBalance,
            suspended: this.suspended
        }
    }
}

module.exports = UserModel