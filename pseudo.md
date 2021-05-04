# Basic functionality

- If submit is clicked, check the validity of all fields and throw errors if any have them
  - Email checking validity
  - Country - must match valid country (datalist)
  - Postcode - must match regex (HTML pattern)
  - Password - 8 characters, 1 number, 1 punctuation (min length 8 characters)
  - Second password - must match 1st and there must BE a valid first

### Email

- If empty, throw alert to fill
- If contains invalid value, throw alert that it must be valid email
- Else apply green tick / permit form submit

### Country

- If empty, throw alert to fill
- If contains invalid value, remind that it must be a country
- If contains country with funny casing, format to correct casing
- Else green tick / permit form submit

### Postcode

- If empty, throw alert to fill
- If contains unmatching regex, alert that it must be a valid postcode
- Else apply green tick / permit form submit

### Password

- If empty, throw alert to fill
- If not, compare to regex and remind that it requires 1 special character and 1 number
- Else apply green tick / permit form submit

### Password Confirmation

- If empty, throw alert to fill
- If not, throw alert immediately if first password is not **full** and **valid**
- Then throw alert if it does not match Password #1
- Else apply green tick / permit form submit

## Regexes

**Email** - use HTML form validate

**Postcode** - `[A-Z][0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}`

**Password** - `[0-9]+` and `/W|_/g`, see [here](https://stackoverflow.com/questions/18812317/javascript-regex-for-special-characters/18812336)

**Password Confirmation** - Password!



## Functions

- On each input (leave or enter field), check if empty

- If so, throw empty field alert (customised?)
- If there is a character minimum, check if that has been reached and alert if problematic
- If not, pass value to check function
- If check function returns string and false, update aria with return value and add exclamation mark
- Else if return value is string and true, update value with string and add green tick
- Else if return value is true, add green tick

## Check function (input type, value)

- **Email** - just check if valid email yo
- **Country** - Must match datalist in *any case*
- **Postcode** - check if valid postcode against regex
- **Password** - Check if valid password against regex
- **Password confirmation** - check if identical to above

Object containing regexes indexed by element id?

```javascript
const regexObj = {
	postcode: // postcode regex
	password: // password regex
	confpassword: undefined // set as password if valid
}
```

If `regexObj[input type]` doesn't match `value`, return conditions and false

If valid and *not* a password, send to **formatter** and return formatter return value and `true`

Else (password) return `true`

### Format string (string)

If multiple words without numbers, return them upppercase

Else if mixture of letters and numbers (postcode), return them uppercase with a space

> **Form validation module**
>
> Regex object (matching values for country, postcode, password and password confirmation)
>
> > **Formatting module**
> >
> > > **Uppercase function** (string)
> > >
> > > Return string as uppercase
> >
> > > **Postcode function** (string)
> > >
> > > Return formatted for postcode
> >
> > > **Country function** (string)
> > >
> > > Create array of datalist countries
> > >
> > > Return the **first** array item which matches **uppercase** version of string
> >
> > Return object with Postcode and Country functions as properties of an object named by ID
>
> > **Validate string function** (string, input id) - 
> >
> > Match string against input id property of regex object
> >
> > If they match, pass through **formatting function** and return return formatted string and true
> >
> > If not, return false and "Please enter a valid {input id}".
>
> > **Validate Password function** (string)
> >
> > Match string against password property of regex object
> >
> > If they match, check if Confirm Password field is empty
> >
> > If it isn't, rerun **Validate String Function** with Confirm Password and its ID
> >
> > Else if they match and Confirm Password is empty, set Confirm Password prop of Regex Object as password and return true
> >
> > If they don't match, return false and input id property of error object
>
> > **Validate password confirmation function** (string)
> >
> > If confpassword property of regex object is undefined, return "Please input a valid password first"
> >
> > Else if it doesn't match, return "Please make sure that your passwords match"
> >
> > Else return true
>
> > **Check validity function** (id, attribute, value)
> >
> > HTML Error Object (length: "Please make sure that your {id} is at least {value} characters"
> >
> > type: "Please provide a valid {}")
> >
> > Return attribute value of error object
> >
> > **If the above doesn't work**:
> >
> > If attribute is length, return "Please make sure that your {id} is at least {value} characters"
> >
> > If attribute is type, return "Please provide a valid {id}"
>
> a
>
> a
>
> > 
>
> a
>
> 