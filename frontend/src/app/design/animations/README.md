### Notes on Angular animations

- :enter in the context of transition: a shortcut for void => \*
- :enter in the context of query: the entering component
- :leave in the context of transition: a shortcut for \* => void
- :leave in the context of query: the leaving component
- query => You are the div that triggers the animation, but the div to animate is a child component of yours
- transition => You are the div that triggers the animation _and_ you want to be the div that gets animated
