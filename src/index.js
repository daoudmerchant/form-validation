const validateForm = (function () {
  let regexObj = {
    country: new RegExp(
      'afghanistan|' +
        'albania|' +
        'algeria|' +
        'andorra|' +
        'angola|' +
        'antigua and barbuda|' +
        'argentina|' +
        'armenia|' +
        'australia|' +
        'austria|' +
        'azerbaijan|' +
        'bahamas|' +
        'bahrain|' +
        'bangladesh|' +
        'barbados|' +
        'belarus|' +
        'belgium|' +
        'belize|' +
        'benin|' +
        'bhutan|' +
        'bolivia|' +
        'bosnia and herzogovina|' +
        'bosnia|' +
        'herzogovina|' +
        'bosnia herzogovina|' +
        'botswana|' +
        'brazil|' +
        'brunei|' +
        'bulgaria|' +
        'burkina faso|' +
        'burundi|' +
        "c[oô]te d[']ivoire|" +
        'cambo verde|' +
        'cameroon|' +
        'canada|' +
        'central african republic|' +
        'chad|' +
        'chile|' +
        'china|' +
        'colombia|' +
        'comoros|' +
        'congo|' +
        'congo[-\\s]brazzaville|' +
        'costa rica|' +
        'croatia|' +
        'cuba|' +
        'cyprus|' +
        'czechia|' +
        'czech republic|' +
        'democratic republic of the congo|' +
        'denmark|' +
        'djibouti|' +
        'dominica|' +
        'dominican republic|' +
        'ecuador|' +
        'egypt|' +
        'el salvador|' +
        'equatorial guinea|' +
        'eritrea|' +
        'estonia|' +
        'eswatini|' +
        'swaziland|' +
        'ethiopia|' +
        'fiji|' +
        'finland|' +
        'france|' +
        'gabon|' +
        'gambia|' +
        'georgia|' +
        'germany|' +
        'ghana|' +
        'greece|' +
        'grenada|' +
        'guatemala|' +
        'guinea|' +
        'guinea[-\\s]bissau|' +
        'guyana|' +
        'haiti|' +
        'holy see|' +
        'honduras|' +
        'hungary|' +
        'iceland|' +
        'india|' +
        'indonesia|' +
        'iran|' +
        'iraq|' +
        'ireland|' +
        'israel|' +
        'italy|' +
        'jamaica|' +
        'japan|' +
        'jordan|' +
        'kazakhstan|' +
        'kenya|' +
        'kiribati|' +
        'kuwait|' +
        'kyrgyzstan|' +
        'laos|' +
        'latvia|' +
        'lebanon|' +
        'lesotho|' +
        'liberia|' +
        'libya|' +
        'liechtenstein|' +
        'lithuania|' +
        'luxembourg|' +
        'madagascar|' +
        'malawi|' +
        'malaysia|' +
        'maldives|' +
        'mali|' +
        'malta|' +
        'marshall islands|' +
        'mauritiana|' +
        'mauritius|' +
        'mexico|' +
        'micronesia|' +
        'moldova|' +
        'monaco|' +
        'mongolia|' +
        'montenegro|' +
        'morocco|' +
        'mozambique|' +
        'myanmar|' +
        'burma|' +
        'namibia|' +
        'nauru|' +
        'nepal|' +
        'netherlands|' +
        'new zealand|' +
        'nicaragua|' +
        'niger|' +
        'nigeria|' +
        'north korea|' +
        'north macedonia|' +
        'norway|' +
        'oman|' +
        'pakistan|' +
        'palau|' +
        'palestine( state)?|' +
        'panama|' +
        'papau new guinea|' +
        'paraguay|' +
        'peru|' +
        'philippines|' +
        'poland|' +
        'portugal|' +
        'qatar|' +
        'romania|' +
        'russia|' +
        'rwanda|' +
        'saint kitts and nevis|' +
        'saint lucia|' +
        'saint vincent and the grenadines|' +
        'samoa|' +
        'san marino|' +
        'sao tome and principe|' +
        'saudi arabia|' +
        'senegal|' +
        'serbia|' +
        'seychelles|' +
        'sierra leone|' +
        'singapore|' +
        'slovakia|' +
        'slovenia|' +
        'solomon islands|' +
        'somalia|' +
        'south africa|' +
        'south korea|' +
        'south sudan|' +
        'spain|' +
        'sri lanka|' +
        'sudan|' +
        'suriname|' +
        'sweden|' +
        'switzerland|' +
        'syria|' +
        'tajikistan|' +
        'tanzania|' +
        'thailand|' +
        'timor[-\\s]leste|' +
        'togo|' +
        'tonga|' +
        'trinidad and tobago|' +
        'tunisia|' +
        'turkey|' +
        'turkmenistan|' +
        'tuvalu|' +
        'uganda|' +
        'ukraine|' +
        'united arab emirates|' +
        'united kingdom|' +
        'united states of america|' +
        'uruguay|' +
        'uzbekistan|' +
        'vanuatu|' +
        'venezuela|' +
        'vietnam|' +
        'yemen|' +
        'zambia|' +
        'zimbabwe',
      'i'
    ),
    postcode: /[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{2}/,
    password: /(?=.*\d)(?=.*[A-Z])(?=.*[\\/!@#$%^&*(),.?":{}|<>])/,
    confpassword: undefined,
  }
  const format = (function () {
    // left out of makeCountry() in case more input values requiring it are added to form later
    const makeUppercase = function (string) {
      let words
      if (string.includes('-')) {
        words = string.split('-')
      } else {
        words = string.split(' ')
      }
      words = words.map((word) => {
        const conjunctionRegex = /and|of|the/i
        if (word.match(conjunctionRegex)) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      return words.join(' ')
    }
    const makePostcode = function (string) {
      if (string.charAt(string.length - 4) !== ' ') {
        string = string.slice(0, -3) + ' ' + string.slice(-3)
      }
      return string.toUpperCase()
    }
    const makeCountry = function (string) {
      const countryOptions = Array.from(document.querySelectorAll('option'))
      const countries = countryOptions.map(
        (countryOption) => countryOption.textContent
      )
      const userCountry = makeUppercase(string)
      let foundCountry = countries.find((country) => {
        return country.startsWith(userCountry)
      })
      if (!foundCountry) {
        foundCountry = countries.find((country) => {
          return country.includes(userCountry)
        })
      }
      if (!foundCountry) {
        foundCountry = countries.find((country) => {
          return country === userCountry.replace(' ', '-')
        })
      }
      return foundCountry
    }
    return {
      postcode: makePostcode,
      country: makeCountry,
    }
  })()
  const validate = (function () {
    const validateCustom = (function () {
      const validateString = function (string, id) {
        if (!string.match(regexObj[id])) {
          return [false, `Please provide a valid ${id}`]
        }
        if (format.hasOwnProperty(id)) {
          return [true, format[id](string)]
        }
        return true
      }
      const validatePassword = function (string) {
        if (!string.match(regexObj.password)) {
          regexObj.confpassword = undefined
          return [
            false,
            'Please note that your password must contain at least 1 upper case letter, 1 number and 1 special character',
          ]
        }
        // is a valid password
        regexObj.confpassword = string
        return true
      }
      const confirmPassword = function (string) {
        if (!regexObj.confpassword) {
          return [false, 'Please provide a valid password first']
        } else if (string !== regexObj.confpassword) {
          return [false, 'Please make sure that your passwords match']
        }
        return true
      }
      return {
        string: validateString,
        password: validatePassword,
        confpassword: confirmPassword,
      }
    })()
    const validateInput = function (element) {
      if (element.id === 'password' && !element.validity.valid) {
        regexObj.confpassword = undefined
      }
      if (element.hasAttribute('minlength') && element.validity.tooShort) {
        return [
          false,
          `Please make sure that your ${
            element.id
          } is at least ${element.getAttribute('minlength')} characters`,
        ]
      } else if (
        (element.hasAttribute('type') && element.validity.typeMismatch) ||
        (element.validity.valueMissing && element.id !== 'confpassword')
      ) {
        return [false, `Please provide a valid ${element.id}`]
      } else if (validateCustom.hasOwnProperty(element.id)) {
        return validateCustom[element.id](element.value)
      } else {
        return validateCustom.string(element.value, element.id)
      }
    }
    return validateInput
  })()
  const handleInput = function (element) {
    const errorMessage = element.parentElement.lastElementChild
    const icon = errorMessage.previousElementSibling
    const addTick = function (check, message) {
      const clearError = function (check, message) {
        check.classList.remove('reject')
        check.textContent = '✓'
        check.classList.add('accept')
        message.textContent = ''
      }
      clearError(check, message)
      message.textContent = ''
    }
    const inputValidity = validate(element)
    if (inputValidity.length) {
      // is array
      if (inputValidity[0]) {
        // is true with updated value
        addTick(icon, errorMessage)
        element.value = inputValidity[1]
      } else {
        // is false with error message
        const addCross = function (check) {
          check.classList.remove('accept')
          check.textContent = '×'
          check.classList.add('reject')
        }
        addCross(icon)
        errorMessage.textContent = inputValidity[1]
      }
    } else {
      // is true
      addTick(icon, errorMessage)
    }
    if (element.id === 'password') {
      const confPassword = document.querySelector('#confpassword') // requery DOM to save complicating function
      console.log(confPassword)
      if (confPassword.value) {
        handleInput(confPassword)
      }
    }
    return inputValidity
  }
  const submitForm = function (e, inputs) {
    let allValid = true
    inputs.forEach((input) => {
      const isValid = handleInput(input)
      if (isValid.length && !isValid[0]) {
        allValid = false
      }
    })
    if (!allValid) {
      e.preventDefault()
    } else {
      return alert(
        'Congratulations, you are now subscribed to My Little Pony Magazine'
      )
    }
  }
  return {
    handleInput,
    submitForm,
  }
  // return handleinput and form validation function in object
})()

// on load

;(function () {
  const form = document.querySelector('form')
  const inputs = Array.from(document.querySelectorAll('input'))
  // const [email, country, postcode, password, confPassword] = inputs
  form.addEventListener('submit', (e) => validateForm.submitForm(e, inputs))
  inputs.forEach((input) =>
    input.addEventListener('input', (e) => validateForm.handleInput(e.target))
  )
})()
