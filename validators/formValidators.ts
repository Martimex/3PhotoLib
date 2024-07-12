import { z } from 'zod';

export const usernameValidator = z.string()
.min(3, {message: 'Please include at least 3 characters'})
.max(20, {message: 'Please do not exceed 20 characters'})
.refine(val => /^[A-z0-9]*$/.test(val), {message: 'Please do not use special characters'} );

export const emailValidator = z.string()
.email({message: 'Please provide a valid e-mail address'})
.refine(val => /[.]{1,1}[A-Za-z]+$/.test(val), {message: 'Please provide a valid e-mail address'})

export const passwordValidator =  z.string()
.min(8, {message: 'Please include at least 8 characters'})
.max(32, {message: 'Please do not exceed 32 characters'})
.regex(/[\d]+/, { message: 'Include at least 1 digit'})
.regex(/[a-z]+/, { message: 'Include at least 1 lowercase letter'})
.regex(/[A-Z]+/, { message: 'Include at least 1 uppercase letter'})
.regex(/[-+_!@#$%^&*.,?]+/, { message: 'Include at least 1 special character'})

export const isTOSAcceptedValidator = z.literal(true, {message: 'You need to accept our Terms of Service'})

export const keyToValidator: {[key: string]: any} = {username: usernameValidator, email: emailValidator, password: passwordValidator, isTOSAccepted: isTOSAcceptedValidator};