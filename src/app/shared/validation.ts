export class ValidationPatterns{
    static readonly name = /^[a-zA-Z ]+$/;
    static readonly email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    static readonly mobileNo = /^\d{10}$/;
    static readonly pincode = /^\d{6}$/;
}