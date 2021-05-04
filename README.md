# Form Validation

I've decided to push this Odin exercise to my GitHub, as I feel my code is higher quality than the previous exercise and I'd like to show my improvement.

As always, this exercise was really tough. As the course suggested, I did spend time working out how I would like to approach the problem, and decided upon a modular/submodular approach.

I have as a basic structure:

> `validateForm` module
>
> > `format` module
>
> > `validate` module
> >
> > > regex key object
> >
> > > `validateCustom` module (functions for comparing values to regex key)
> >
> > > `validateInput` exposed function (checking if input meets HTML criteria before passing to `validateCustom`)
>
> > `handleInput` function (exposed to assign to inputs)
>
> > `submitForm` function (exposed to assign to form)

> IIFE to assign `handleInput` and `submitForm` to elements

This way, everything is bundled in to a `validateForm` module should that be imported in to a larger webpage, but individual modules such as `format` and `validate` can easily be extracted in refactoring.

This exercise was not billed as a project, but still took me days... Once again, the difficulty for me is the constant refactoring and rethinking how to most logically distribute information, appropriately scope variables, minimise DOM queries etc. I hope this is normal for such efforts to take so long at this stage of the learning! Somehow I feel that this exercise wasn't intended to be (excluding the `regexObj`) nearly 300 lines of code, but that's what it took me to be happy with the functionality. I like how the form accepts 'loose' correct entries and automatically formats them appropriately, and I was careful to make sure that the password confirmation is revalidated if it has a value and the password is edited.
